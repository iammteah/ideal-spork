import sqlite3
import functools
import numpy as np
from math import log2

# represents the feedback for one query
class Feedback:
    def __init__(self, qid):
        # query id
        self.qid = qid

        # hosts True for every relevant doc, False for every irrelevant doc
        self.relecance = []

    def addRelJud(self, rank, fb):
        self.fillUpRelSizeToMatchRank(rank)
        self.relecance[rank - 1] = fb == 1

    def fillUpRelSizeToMatchRank(self, rank):
        while (len(self.relecance) < rank):
            self.relecance.append(False)

    # calculate precision@k
    def precisionAtK(self, rank):
        return functools.reduce(lambda counter, rel: counter + 1 if rel else counter, self.relecance[0: rank], 0) / rank

    # calculate the average precision
    def getAvgPrecision(self):
        precission_sum = 0
        for i, rel in enumerate(self.relecance):
            if (rel):
                precission_sum += self.precisionAtK(i + 1)

        relDocsCount = sum(1 for x in self.relecance if x)
        return precission_sum / relDocsCount if relDocsCount != 0 else 0

    def getDcgAtK(self, rank):
        return sum([((2**(1 if r else 0) - 1)/(log2(2+i))) for i, r in enumerate(self.relecance[:rank])])

    def getIdealDcgAtK(self, rank):
        idealRelevance = sorted(self.relecance, reverse=True)
        return sum([((2**(1 if r else 0) - 1)/(log2(2+i))) for i, r in enumerate(idealRelevance[:rank])])

    def getNdcgAtK(self, rank):
        dcg = self.getDcgAtK(rank)
        return dcg / self.getIdealDcgAtK(rank) if dcg != 0 else 0



# simplifies handling of table rows, builds an object for each row
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d




# a cycle is defined by the first and last id of the feedback
evaluation_cycles = {
    "baseline": (0, 1740),
    "improvement one": (1741, 3099),
    "improvement two": (3100, 99999)
}

# a list of topics with query ids
topics = {
    "Flüchtlingspolitik": [1, 6],
    "Naher Osten": [7, 9, 10, 11],
    "Arabischer Frühling": [12, 13, 14, 15, 16, 17],
    "Angela Merkel": [18, 19, 20, 21, 22],
    "Martin Schulz": [23, 24],
    "Terrorismus": [27, 28, 29],
    "Brexit": [31, 32, 33, 35],
    "Afrikapolitik": [36, 37, 38, 39, 40],
    "Bundestagswahl": [42, 43],
    "Amerikapolitik": [44, 45, 46, 47],
    "EU-Politik": [48, 49, 53],
    "Klima-Politik": [54, 55],
    "Türkei-Politik": [56, 57, 58, 59],
    "Verteidigungs- und Rüstungspolitik": [61, 62, 63]
}

conn = sqlite3.connect('evaluation.sqlite')
c = conn.cursor()

# create plain object for each row
all_feedback = [dict_factory(c, row) for row in c.execute('SELECT * FROM feedback')]

# create a list of Feedback objects from the table rows
def feedback_reducer(accu, new):
    # if the query id changes we must create a new object
    if(len(accu) == 0 or accu[-1].qid != new["query"]):
        accu.append(Feedback(new["query"]))

    # add the relevance judgement to the last object
    accu[-1].addRelJud(new["rank"], new["isRelevant"])

    return accu





for cycle in evaluation_cycles:
    print(f"\nCycle: {cycle}")

    # use only the rows of the cycles scope
    cycle_feedback = filter(lambda f: f["id"] in range(evaluation_cycles[cycle][0], evaluation_cycles[cycle][1] + 1),
                            all_feedback)

    # create a list of feedback objects
    feedbackObjs = functools.reduce(feedback_reducer, cycle_feedback, [])
    print("  - MAP overall:", np.mean([r.getAvgPrecision() for r in feedbackObjs]))
    print("  - mean NDCG ([@1, @2, .. , @10]):", [round(np.mean([r.getNdcgAtK(k) for r in feedbackObjs]), 4) for k in range(1,11)])
    print("  MAP Per topic:")
    for topic in topics:
        print(f"    - {topic}: {np.mean([r.getAvgPrecision() for r in feedbackObjs if r.qid in topics[topic]])}")
