# (ENG) SAVE module, Calls log animation. 

## Document

This document describes the module's general funcionality, as well as the XML format from where it extracts the necessary information. 


## 1 - Description

From a Calls graph defined as XML, the module produces a graphical animation in order to show how this calls are happening. All the graphic functionality was implemented with "CytoscapeJS" library. 
Also, a filter form was developed so it's possible to shorten the calls list to a focused group.
From this description: 
	The module reads an XML file that represents the calls graph. The module expects a graph with "Nodes" and "Links".
	For the "Nodes", it expects attributes as: Telephone Number("Attr_1"), LocationX, LocationY and Id.
	For the "Links", it expects attributes as: Date ("Attr_1"), Duration, Id, From and To.

## 2 - Functionality

The entire module was developed in JavaScript.
The functions that read and parse the XML file, are located in "xml_handler.js".
Then, there is a submodule called "generate_grafo.js". The functions that are located in this file are: 

#### get_nodes_list(XML xml)
 	Returns a Node Objects list from the XML file. The Node Object has the following attributes: "number", "coord_x", "coord_y" y "id".

#### get_ordered_links_list(XML xml)
 	Returns an ORDERED Link Objects list from the XML file. The order criteria is the date. 
	In order to do this, it gets the raw Link Objects list with the following attributes: "date", "from", "to" y "id". 
	After this, it casts the "date" attribute to a Date Object. This is acomplished with the "format_links_date(Link links)" function.
	Finally, it orders the Link Objects list with the "order_links_by_date(Link links)" function. 
	
#### get_nodes_min_coordinates()
	Obtains the minimal (x,y) nodes coordinates, in order to establish the graphic size.   

#### get_nodes_max_coordinates()
	Obtains the maximal (x,y) nodes coordinates, in order to establish the graphic size.

The "drawing.js" submodule, has the following functions: 


#### draw_grafo()
	Draws a graph, drawing nodes and links. Uses "CytoscapeJS" library. To draw a graph, it creates a Cytoscape Object, and sets style configurations, container, graphic size, etc. Calls functions "draw_nodes()" and "draw_links()".

#### draw_nodes()
	Draws nodes. For positioning, utilizes "LocationX" y "LocationY" attributes from the Node List. Also uses "CytoscapeJS" library. 

#### draw_links()
	Draws links. In order to connect links and nodes, uses "To" y "From" Links attributes and matches with Nodes ID already created in the graph. Also uses "CytoscapeJS" library.

The functions allocated in "go_over_links.js" y "show_link.js" submodules are the ones that are  used to make the referenced call animation, with the corresponding details. 

The submodule "go_over_links.js", has the following functions:


#### first_step(List list, String which)
	Sets step in ceto, turns off previous step nodes and turns on current step nodes. 

#### next_step(List list, String which)
	Turns off previous step nodes, increments the step, and turns on current step nodes. 

#### previous_step(List list, String which)
	Turns off previous step nodes, decrements the step, and turns on current step nodes. 
	
#### indexed_step(List list, String which)
	Refreshes the view based on the element that was selected from the filter list. 

The "show_link.js" submodule, has the following functions: 

#### turn_on_nodes(Link link)
	Changes the nodes and links color when turned on. It gets the link as argument to know which call the user wants to see. 

#### turn_off_nodes(Link link)
	Changes the nodes and links color when turned off. It gets the link as argument to know which call the user wants to see. 

#### get_call_details(Link link, div)
	Generates calls details. It gets the link as argument to know which call the user wants to see.

#### get_calls_list(List list, which)
	Fills a select list of calls.  


The function refering the filter form, is allocated in "filter_form":

#### analyze_form()
	Generates the calls list based on the filter that was entered. 

## 3 - XML structure example

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

# (ESP) Módulo para SAVE, animación en llamadas. 

Documento
---------
Este documento describe la funcionalidad general del módulo, así como también el formato del archivo XML del que extrae la información. 

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
	Para los "Enlaces", lee atributos de: Fecha ("Atributo_1"), Duration, Id, From y To. 



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
