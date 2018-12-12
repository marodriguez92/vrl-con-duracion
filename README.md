M�dulo para SAVE, animaci�n en llamadas. 
========================================

Documento
---------
Este documento describe la funcionalidad general del m�dulo, as� como tambi�n el formato del archivo
XML del que extrae la informaci�n. 


1 - Descripci�n
---------------

Este m�dulo, en base a un grafo de llamadas pasado en formato XML, se realiza una animaci�n para 
mostrar c�mo van ocurriendo esas llamadas. Para toda la funcionalidad gr�fica del m�dulo, se 
utiliz� la librer�a "Cytoscape".
A su vez, se implemeta un formulario de filtro para poder acotar el listado de llamadas a un 
cierto conjunto de inter�s.

Para esto: 
	Lee el archivo XML que representa el grafo de llamadas. El m�dulo esta preparado para 
recibir un XML con "Nodos" y "Enlaces". 
	Para los "Nodos", lee atributos de: Nro. de Tel. ("Atributo_1"), LocationX, LocationY e Id. 
	Para los "Enlaces", lee atributos de: Fecha ("Atributo_1"), Id, From y To. 

NOTA: El m�dulo no se prepar� para recibir las duraci�n de cada llamada. 


2 - Detalles de funcionalidad
-----------------------------

Todo el m�dulo se desarroll� en JavaScript. 
Las funciones que se encargan de leer el XML y crear un Objeto XML para luego tratar, se encuentran 
en el subm�dulo "xml_handler.js".

Luego, se tiene el subm�dulo "generate_grafo.js". En este se encuentran las siguientes funciones:
	get_nodes_list(XML xml)
	----------------------- 
		Devuelve la lista de Objetos Nodo a partir del Objeto XML. El Objeto 
		Nodo tiene los siguientes atributos: "number", "coord_x", "coord_y" y "id".  
	get_ordered_links_list(XML xml)
	------------------------------- 
		Devuelve la lista de Objetos Enlace ORDENADOS por fecha a partir del Objeto XML. 
		Aclaraci�n: los enlaces que vienen en el XML no se encuentran ordenadas por fecha. 
		Para esto, se obtiene la lista cruda de Objetos Enlace. El Objeto Enlace tiene los 
		siguientes atributos: "date", "from", "to" y "id". 
		Luego se modifica el atributo date del Objeto Enlace, para transformarlo en
		Objeto Date. Esto se hace con la funci�n "format_links_date(Link links)". 
		Finalmente, se ordena la lista de Objetos Enlace con la funci�n "order_links_by_date(Link links)". 
	get_nodes_min_coordinates()
	---------------------------
		Obtiene x,y m�nimas de las coordenadas de los nodos, para establecer el tama�o del gr�fico.
	get_nodes_max_coordinates()
	---------------------------
		Obtiene x,y m�ximas de las coordenadas de los nodos, para establecer el tama�o del gr�fico.

En el subm�dulo "drawing.js", se tienen las siguientes funciones: 
	draw_grafo()
	------------
		Dibuja el grafo, dibujando los nodos y enlaces. Utiliza la librer�a "Cytoscape". 
		Para dibujar el grafo, crea el Objeto Cytoscape, seteandole distintas configuraciones de
		estilo, contenedor, tama�o del gr�fico, etc. Llama a las funciones "draw_nodes()" y draw_links().
	draw_nodes()
	------------
		Dibuja los nodos. Para posicionarlos, utiliza los atributos "LocationX" y "LocationY" de la lista de nodos.
		Utiliza la librer�a "Cytoscape".
	draw_links()
	------------
		Dibuja los enlaces. Para enganchar los enlaces con los nodos, usa los atributos "To" y "From" del enlace y 
		los matchea con los ID de los nodos ya creados en el gr�fico.
		Utiliza la librer�a "Cytoscape".


Para realizar la animaci�n de la llamada que se est� haciendo referencia, con sus respectivos detalles, 
se encargan las funciones alojadas en "go_over_links.js" y "show_link.js".

El subm�dulo "go_over_links.js", contiene las siguientes funciones: 
	first_step(List list, String which)
	---------------------------------
		Pone el paso en cero, apaga los nodos del paso anterior y prende los nodos que estan hablando.
		El argumento "which" indica sobre qu� vista se est� trabajando, si sobre la del paso del total de las 
		llamadas o sobre la vista del filtro. 
	next_step(List list, String which)
	--------------------------------
		Apaga el paso anteior, incrementa el paso y prende los nodos que estan hablando. El argumento "which" 
		indica sobre qu� vista se est� trabajando, si sobre la del paso del total de las llamadas o sobre la 
		vista del filtro.
	previous_step(List list, String which)
	------------------------------------
		Apaga el paso anteior, decrementa el paso y prende los nodos que estan hablando. El argumento "which" 
		indica sobre qu� vista se est� trabajando, si sobre la del paso del total de las llamadas o sobre la 
		vista del filtro.
	indexed_step(List list, String which)
	-----------------------------------
		Actualiza el grafo a partir del elemento que se selecciono de la lista del filtro. El argumento "which" 
		indica sobre qu� vista se est� trabajando, si sobre la del paso del total de las llamadas o sobre la 
		vista del filtro.

El subm�dulo "show_link.js", contiene las siguientes funciones:
	turn_on_nodes(Link link)
	------------------------
		Cambia el color de los nodos y enlaces a prender. Se le pasa el enlace como argumento para conocer la
		llamada de inter�s. 
	turn_off_nodes(Link link)
	-------------------------
		Cambia el color de los nodos  y enlaces a apagar. Se le pasa el enlace como argumento para conocer la
		llamada de inter�s. 
	get_call_details(Link link, div)
	--------------------------------
		Genera el HTML de los detalles de la llamada. Se le pasa el enlace como argumento para conocer la
		llamada de inter�s, y el div del detalle que se quiere imprimir. Puede ser el div de la vista del paso
		de las llamadas completas o la vista del filtro. 
	get_calls_list(List list, which)
	--------------------------------
		Llena una lista select de llamadas. Se le indica cual se quiere vaciar, si la del Paso o la del Filtro. 


La funci�n referida al formulario de filtro, se encuentra alojada en "filter_form". Esta es: 
	analyze_form()
	--------------
		Genera la lista de llamadas en base al filtro que se ingreso. A su vez, reincia la vista del filtro. 

3 - Ejemplo de estructura XML
-----------------------------
<?xml version="1.0"?>

<graph>
	<nodes>
		...
		...
		...
		
		<node Atributo_1="2215025445 LocationY="201.61129159731735" LocationX="-135.2054876862896" Id="0_10"/>

		...
		...
		...
	</nodes>
	<links>	
		...
		...
		...
		
		<link Atributo_1="01/02/2016 1:22" Id="wGdJY_1" To="0_20" From="0_10"/>

		...
		...
		...
	</links>
</graph>