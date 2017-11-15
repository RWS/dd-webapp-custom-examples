# ISH UGC module exposes REST API for operations related to commenting

| URL | Class and method  | Description  | Errors |
| :-----: | :----: | :----: | :----: |
| /api/comments/{publicationId}/{pageId} | <nobr>Class: UgcController</nobr> <br><nobr>Method: getComments</nobr> | Gets comments for specific topic with {pageId} and {publicationId} | <ul><li>Response "Unable to find publication {publicaionId}" will be returned when wrong publicationId was specified.<li>"Page not found..." is returned as response when wrong pageId was specified.</ul> |
| /api/comments/add | <nobr>Class: UgcController</nobr> <br><nobr>Method: postComment</nobr> | Submits new comment. JSON with comment has structure:<br>```{"publicationId":"{publicationId}", "pageId":"{pageId}", "username":"{entered username}", "email":"{entered email}", "content":"{comment content}", "parentId": {Id of parent comment, 0 if it is root comment}}``` | 405 error is returned if wrong publicationId or pageId were specified |