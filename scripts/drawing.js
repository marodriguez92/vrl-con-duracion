function draw_grafo() {
    // Grafico del grafo, con nodos y enlaces. 

    // Modifica el div para el cy. 
    var banda_extra = 200;

    // Setea propiedades del objeto cytoscape. 
    cy = cytoscape({

        container: document.getElementById('cy'), // Container en donde se hace el render. 
        
        width: (Math.abs(grafo.x_limit) + Math.abs(grafo.x_offset) + banda_extra).toString() + 'px',

        height: (Math.abs(grafo.y_limit) + Math.abs(grafo.y_offset) + banda_extra).toString() + 'px', 

        style: [ // El estilo del grafo. 
        {
            selector: 'node',
                style: {
                    'background-color': '#DEB887'
                }
        },

        {
            selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                }
        }],

        layout: {
            name: 'grid',
            rows: 1
        },

        wheelSensitivity: 0.05
    });

    // Dibuja los nodos. 
    draw_nodes();
    // Dibuja los enlaces. 
    draw_links();

    // Acomoda el grafo en pantalla. 
    cy.fit();

    // Genera un div para 
    div = document.createElement("div");
    div.setAttribute("id", "asd");
    div.style.position = "absolute";
    div.style.top = "2%";
    div.style.left = "80%";
    div.style.zIndex = "999";

    cy.container().childNodes[0].appendChild(div);

    // Handler del evento onTap del grafico. 
    cy.on('tap', function(evt){
        var event_target = evt.target;
        
        try {
            if (event_target.isEdge()) {
                if (event_target.style('line-color') == '#ff0000') {
                    var date = new Date(event_target.data('date'));

                    text = '<b><u>Detalle de enlace</u></b> <br>';
                    text += '<b>Llamante: </b>' + cy.$('#' + event_target.data('source')).data('number') + '<br>';
                    text += '<b>Llamado: </b>' + cy.$('#' + event_target.data('target')).data('number') + '<br>';
                    text += '<b>Fecha: </b>' + date.getDate() + '/' + (date.getMonth() + 1) + '/' 
                            + date.getFullYear() + '<br>'; 
                    text += '<b>Hora: </b>' + event_target.data('date').toString().slice(16, 21) + '<br>';
                    text += '<b>Duraci&oacuten: </b>' + event_target.data('duration').toString() + 's';
                } else {
                    text = '';
                }
            }
        }
        catch(err) {
            text = '';
        }

        document.getElementById('asd').innerHTML = text;
    });
}

function draw_nodes() {
    // Para posicionarlos, utiliza los atributos "LocationX" y "LocationY" de la lista de nodos. 

    for (i = 0; i < grafo.nodes_list.length; i++) {
         cy.add([
            {   group: "nodes", 
                data: { id: grafo.nodes_list[i].id,
                        number: grafo.nodes_list[i].number }, 
                position: { 
                    x: parseFloat(grafo.nodes_list[i].coord_x) + Math.abs(grafo.x_offset) + 22, 
                    y: parseFloat(grafo.nodes_list[i].coord_y) + Math.abs(grafo.y_offset) + 22 
                }
            }
        ]);   
    }

    
}

function draw_links() {
    /*  Para enganchar los enlaces con los nodos, 
        usa los atributos "To" y "From" del enlace y los matchea con los ID de los nodos ya creados en el svg.
    */

    for (i = 0; i < grafo.links_list.length; i++) {
        to = "#" + grafo.links_list[i].to;
        from = "#" + grafo.links_list[i].from;
        if (cy.$(to).edgesWith(from).length < 1) {
            cy.add([
                {   group: "edges", 
                    data: { id: grafo.links_list[i].id, 
                            source: grafo.links_list[i].from, 
                            target: grafo.links_list[i].to,
                            date: grafo.links_list[i].date,
                            duration: grafo.links_list[i].duration } 
                }
            ]);    
        }
    }
}