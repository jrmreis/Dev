<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%-- 
    Document   : newjsp
    Created on : 15/09/2020, 11:38:39
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
        <h1>Consulta</h1>
        
        <a href="">Tabela</a>
        
        <sql:query var="netbeansjoel" dataSource="ConnectionFactory.java">
            SELECT * FROM netbeansjoel
        </sql:query>
</table>
        
        
    </body>
</html>
