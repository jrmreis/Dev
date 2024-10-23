<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%> 




<%-- 
    Document   : index
    Created on : 10/09/2020, 14:37:46
    Author     : Joel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        

            
            <sql:query var="Lista" scope="application" dataSource="Netbeansjoel.java">
                SELECT * FROM NETBEANSJOEL
            </sql:query>
        
    </body>
</html>
