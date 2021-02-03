FROM solr:7.5

ADD --chown=solr:solr ./config/solr.xml /opt/solr/server/solr/solr.xml
ADD --chown=solr:solr ./core /opt/solr/server/solr/mycores
ADD --chown=solr:solr ./config/web.xml /opt/solr/server/solr-webapp/webapp/WEB-INF/web.xml

CMD ["solr-foreground"]