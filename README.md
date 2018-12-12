Módulo para SAVE, animación en llamadas. 
========================================

Documento
---------
Este documento describe la funcionalidad general del módulo, así como también el formato del archivo
XML del que extrae la información. 


1 - Descripción
---------------

Este módulo, en base a un grafo de llamadas pasado en formato XML, se realiza una animación para 
mostrar cómo van ocurriendo esas llamadas. Para toda la funcionalidad gráfica del módulo, se 
utilizó la librería "Cytoscape".
A su vez, se implemeta un formulario de filtro para poder acotar el listado de llamadas a un 
cierto conjunto de interés.

Para esto: 
	Lee el archivo XML que representa el grafo de llamadas. El módulo esta preparado para 
recibir un XML con "Nodos" y "Enlaces". 
	Para los "Nodos", lee atributos de: Nro. de Tel. ("Atributo_1"), LocationX, LocationY e Id. 
	Para los "Enlaces", lee atributos de: Fecha ("Atributo_1"), Id, From y To. 

NOTA: El módulo no se preparó para recibir las duración de cada llamada. 


2 - Detalles de funcionalidad
-----------------------------

Todo el módulo se desarrolló en JavaScript. 
Las funciones que se encargan de leer el XML y crear un Objeto XML para luego tratar, se encuentran 
en el submódulo "xml_handler.js".

Luego, se tiene el submódulo "generate_grafo.js". En este se encuentran las siguientes funciones: 

get_nodes_list(XML xml)
----------------------- 
	Devuelve la lista de Objetos Nodo a partir del Objeto XML. El Objeto 
	Nodo tiene los siguientes atributos: "number", "coord_x", "coord_y" y "id".  
get_ordered_links_list(XML xml)
------------------------------- 
	Devuelve la lista de Objetos Enlace ORDENADOS por fecha a partir del Objeto XML. 
	Aclaración: los enlaces que vienen en el XML no se encuentran ordenadas por fecha. 
	Para esto, se obtiene la lista cruda de Objetos Enlace. El Objeto Enlace tiene los 
	siguientes atributos: "date", "from", "to" y "id". 
	Luego se modifica el atributo date del Objeto Enlace, para transformarlo en
	Objeto Date. Esto se hace con la función "format_links_date(Link links)". 
	Finalmente, se ordena la lista de Objetos Enlace con la función "order_links_by_date(Link links)". 
get_nodes_min_coordinates()
---------------------------
	Obtiene x,y mínimas de las coordenadas de los nodos, para establecer el tamaño del gráfico.
get_nodes_max_coordinates()
---------------------------
	Obtiene x,y máximas de las coordenadas de los nodos, para establecer el tamaño del gráfico.

En el submódulo "drawing.js", se tienen las siguientes funciones: 

draw_grafo()
------------
	Dibuja el grafo, dibujando los nodos y enlaces. Utiliza la librería "Cytoscape". 
	Para dibujar el grafo, crea el Objeto Cytoscape, seteandole distintas configuraciones de
	estilo, contenedor, tamaño del gráfico, etc. Llama a las funciones "draw_nodes()" y draw_links().
draw_nodes()
------------
	Dibuja los nodos. Para posicionarlos, utiliza los atributos "LocationX" y "LocationY" de la lista de nodos.
	Utiliza la librería "Cytoscape".
draw_links()
------------
	Dibuja los enlaces. Para enganchar los enlaces con los nodos, usa los atributos "To" y "From" del enlace y 
	los matchea con los ID de los nodos ya creados en el gráfico.
	Utiliza la librería "Cytoscape".


Para realizar la animación de la llamada que se está haciendo referencia, con sus respectivos detalles, 
se encargan las funciones alojadas en "go_over_links.js" y "show_link.js".

El submódulo "go_over_links.js", contiene las siguientes funciones: 

first_step(List list, String which)
---------------------------------
	Pone el paso en cero, apaga los nodos del paso anterior y prende los nodos que estan hablando.
	El argumento "which" indica sobre qué vista se está trabajando, si sobre la del paso del total de las 
	llamadas o sobre la vista del filtro. 
next_step(List list, String which)
--------------------------------
	Apaga el paso anteior, incrementa el paso y prende los nodos que estan hablando. El argumento "which" 
	indica sobre qué vista se está trabajando, si sobre la del paso del total de las llamadas o sobre la 
	vista del filtro.
previous_step(List list, String which)
------------------------------------
	Apaga el paso anteior, decrementa el paso y prende los nodos que estan hablando. El argumento "which" 
	indica sobre qué vista se está trabajando, si sobre la del paso del total de las llamadas o sobre la 
	vista del filtro.
indexed_step(List list, String which)
-----------------------------------
	Actualiza el grafo a partir del elemento que se selecciono de la lista del filtro. El argumento "which" 
	indica sobre qué vista se está trabajando, si sobre la del paso del total de las llamadas o sobre la 
	vista del filtro.

El submódulo "show_link.js", contiene las siguientes funciones: 

turn_on_nodes(Link link)
------------------------
	Cambia el color de los nodos y enlaces a prender. Se le pasa el enlace como argumento para conocer la
	llamada de interés. 
turn_off_nodes(Link link)
-------------------------
	Cambia el color de los nodos  y enlaces a apagar. Se le pasa el enlace como argumento para conocer la
	llamada de interés. 
get_call_details(Link link, div)
--------------------------------
	Genera el HTML de los detalles de la llamada. Se le pasa el enlace como argumento para conocer la
	llamada de interés, y el div del detalle que se quiere imprimir. Puede ser el div de la vista del paso
	de las llamadas completas o la vista del filtro. 
get_calls_list(List list, which)
--------------------------------
	Llena una lista select de llamadas. Se le indica cual se quiere vaciar, si la del Paso o la del Filtro. 


La función referida al formulario de filtro, se encuentra alojada en "filter_form". Esta es: 

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
