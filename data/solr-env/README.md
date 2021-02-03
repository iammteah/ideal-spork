#general
- solr-env is the dir to hold all data which is crucial for solr to work properly
- how the data is mounted by docker can be watched in the volumes section of the docker-compose-file
! dir and file permissions are set to rwxrwxrw(776) which can be insecure and should be fixed asap 

#config
solr.xml
https://lucene.apache.org/solr/guide/7_5/configuring-solrconfig-xml.html

#core

#logs