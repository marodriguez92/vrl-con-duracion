function get_nodes_list(xml) {
    // Obtiene una lista de nodos del XML.

    var xmlDoc = xml.responseXML;
    var raw_list = xmlDoc.getElementsByTagName('node');
    var nodes_list = new Array();

    for (i=0; i < raw_list.length; i++) {
        var node = new Object();
        node.number = raw_list[i].getAttribute('Etiqueta');
        node.coord_x = raw_list[i].getAttribute('LocationX');
        node.coord_y = raw_list[i].getAttribute('LocationY');
        node.id = raw_list[i].getAttribute('Id');

        nodes_list.push(node);
    }

    return nodes_list
}

function get_ordered_links_list(xml) {
    /*  Obtiene una lista de los enlaces ordenados por su fecha.
        Para eso, primero formatea el atributo del enlace que tiene la fecha.
        Luego, las ordena de forma ascendente.
    */
    var xmlDoc = xml.responseXML;
    var raw_list = xmlDoc.getElementsByTagName('link');
    var links_list = new Array();

    for (i=0; i < raw_list.length; i++) {
        var link = new Object();
        link.date = raw_list[i].getAttribute('Etiqueta');
        // Elimina dobles espacios en la cadena de la fecha. 
        // Para evitar un mal tratamiento de la misma posteriormente. 
        link.date = link.date.replace(/  +/g, ' ');
        link.from = raw_list[i].getAttribute('From');
        link.to = raw_list[i].getAttribute('To');
        //link.duration = raw_list[i].getAttribute('Atributo_2003');
        link.duration = randomIntBetween(0, 1200);
        link.id = raw_list[i].getAttribute('Id');

        links_list.push(link);
    }

    links_list = format_links_date(links_list);
    links_list = order_links_by_date(links_list);

    return links_list
}

function order_links_by_date(links) {
    // Ordena los enlaces por su fecha de forma ascendente.

    links.sort(function(a,b) {
        var aDate = Date.parse(a.date.toString());
        var bDate = Date.parse(b.date.toString());
        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
    });

    return links     
}

function format_links_date(links) {
    // Formatea el atributo del enlace que tiene la fecha.

    for (i = 0; i < links.length; i++) {
        var hora = links[i].date.slice(11, 13);
        var minutos = links[i].date.slice(14, 20);
        if (hora[1] == ':') { 
            hora = links[i].date.slice(11, 12); 
            minutos = links[i].date.slice(13, 20);
        }
        links[i].date = new Date(links[i].date.slice(6, 10), 
                                                    parseInt(links[i].date.slice(3, 5))-1,
                                                    links[i].date.slice(0, 2),
                                                    hora,
                                                    minutos)
                                                /* 
                                                primer argumento: año
                                                segundo argumento: mes (debo restar 1 -> el rango Date es 0-11)
                                                tercer argumento: dia 
                                                cuarto argumento: hora
                                                quinto argumento: minutos  
                                                */
    }

    return links 
}

function get_nodes_min_coordinates() {
    /*  Obtiene x,y minimas de las coordenadas de los nodos, 
        para establecer un offset.
    */

    var minx, miny; 
    minx = miny = 0;
    for (i = 0; i < grafo.nodes_list.length; i++) {   
        if (parseFloat(grafo.nodes_list[i].coord_x) < minx) 
            minx = parseFloat(grafo.nodes_list[i].coord_x);
        if (parseFloat(grafo.nodes_list[i].coord_y) < miny) 
            miny = parseFloat(grafo.nodes_list[i].coord_y);
    }

    return [minx, miny]
}

function get_nodes_max_coordinates() {
    /*  Obtiene x,y maximas de las coordenadas de los nodos, 
        para establecer el tamaño del grafico. 
    */

    var maxx, maxy; 
    maxx = maxy = 0;
    for (i = 0; i < grafo.nodes_list.length; i++) {   
        if (parseFloat(grafo.nodes_list[i].coord_x) > maxx) 
            maxx = parseFloat(grafo.nodes_list[i].coord_x);
        if (parseFloat(grafo.nodes_list[i].coord_y) > maxy) 
            maxy = parseFloat(grafo.nodes_list[i].coord_y);
    }

    return [maxx, maxy]
}

function randomIntBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}