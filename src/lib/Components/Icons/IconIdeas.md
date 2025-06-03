For like Lucide Icon-Names in DB and having prebundled to not depend on CDN 

* dynamic at developing and build
* at build-time known Icons, like icon-names in DB, are prebundled
* fallback to CDN in case not yet synced (because time between next build and , ...)

As developer I want a Component that shows Icons...

Use the LucideIcon in the project at developing.
hava a 
     dynamic-synced-list.json that holds names that knowingly are used dynamic (like in DB but may also changed in prod)
have a vite-plugin/postinstaller that takes the 