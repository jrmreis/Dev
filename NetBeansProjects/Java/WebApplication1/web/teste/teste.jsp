<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%-- 
    Document   : teste
    Created on : 16/09/2020, 15:30:18
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

        <sql:query var="sdaf" scope="request" dataSource="jdbc/AffableBean">
            SELECT * FROM product
        </sql:query>



    </body>
</html>
