#YouTube-Comment-Search

yt-data > elasticsearch <> python-middleware(queries,logging) < angular-frontend
1. Schritt Finde Tutorials (Metadaten+Suchworte > Index)
2. Finde gute Tutorials (Evaluationsmetrik)

##
zu 2)
Probleme: Precision(false positives), geringer recall, performance issues

Eval-Tools: Logging(user actions,results, elapsed time), Analytics Seite im Frontend(analytische Markierung im Frontend)

Optimierung:
- Precision -> mehr Metadaten (sentiments der Kommentare)

- Ein Suchbegriff generell besser als Kombinationen
- je spezieller das Topic, desto besser die prec

#Rezept-Suche

json google extractor (gson)
in hibernate-db indiziert (mit spring)
logging + docs in postgresql

searchqueries mit sql(lucene syntax)

push-ranking

results mit snippets(local in db) + relevanzkriterien (kochzeit...)
>> indirektes Relevanzfeedback 

Evaluation:
CL-Tool welche manuelle suche erlaubt und result-metriken zurückgibt

#Polive PR Search

bulk index api
boolean retrieval + multi_match (most_fields+fuzzyness)

#material safety datasheet search

dataset txt 
raw => dokument segmentierung as sections => solr index
github material safety search 

#patentsuche
track-eval-tool

#recipe search 2
log query store + ELK Index & Document-Store
