function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function generarImagen() {
    var html = d3.select("svg")
            .attr("title", "test")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;
    $(".preview").html("<img src=data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(html))) + ">");
}

function mouseover(d) {
    d3.select(this).select("rect.rectangulo-hijos2").classed("hover", true);
    d3.select(this).select("rect.rectangulo-hijos").classed("hover", true);
    d3.select(this).select("rect.rectangulo-texto").classed("hover", true);

}

// Toggle children on click.
function mouseout(d) {
    d3.select(this).select("rect.rectangulo-hijos2").classed("hover", false);
    d3.select(this).select("rect.rectangulo-hijos").classed("hover", false);
    d3.select(this).select("rect.rectangulo-texto").classed("hover", false);
}

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

function toggleAll(d) {
    if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
    }
}

function actualizarEventos() {
    $(".node a").on("click", function (e) {
        window.location = $(this).attr('href');
        e.stopPropagation();
    });

}

function getDepth(obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            var tmpDepth = getDepth(d)
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return 1 + depth
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.2, // ems
                x = text.attr("x"),
                y = text.attr("y"),
                dy = text.attr("dy") ? text.attr("dy") : 0;

        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            var centradox = x + (width - tspan.node().getComputedTextLength()) / 2;

            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

var _queryTreeSort = function (options) {
    var cfi, e, i, id, o, pid, rfi, ri, thisid, _i, _j, _len, _len1, _ref, _ref1;
    id = options.id || "id";
    pid = options.parentid || "parentid";
    ri = [];
    rfi = {};
    cfi = {};
    o = [];
    _ref = options.q;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        e = _ref[i];
        rfi[e[id]] = i;
        if (cfi[e[pid]] == null) {
            cfi[e[pid]] = [];
        }
        cfi[e[pid]].push(options.q[i][id]);
    }
    _ref1 = options.q;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        e = _ref1[_j];
        if (rfi[e[pid]] == null) {
            ri.push(e[id]);
        }
    }
    while (ri.length) {
        thisid = ri.splice(0, 1);
        o.push(options.q[rfi[thisid]]);
        if (cfi[thisid] != null) {
            ri = cfi[thisid].concat(ri);
        }
    }
    return o;
};

var _makeTree = function (options) {
    var children, e, id, o, pid, temp, _i, _len, _ref;
    id = options.id || "id";
    pid = options.parentid || "parentid";
    children = options.children || "children";
    temp = {};
    o = [];
    _ref = options.q;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        e[children] = [];
        temp[e[id]] = e;
        if (temp[e[pid]] != null) {
            temp[e[pid]][children].push(e);
        } else {
            o.push(e);
        }
    }
    return o;
};

var _renderTree = function (tree) {
    var e, html, _i, _len;
    html = "<ul class='sections'>";
    for (_i = 0, _len = tree.length; _i < _len; _i++) {
        e = tree[_i];
        html += "<li class='department'><a href=''><span>" + e.name + "</span></a>";
        if (e.children != null) {
            html += _renderTree(e.children);
        }
        html += "</li>";
    }
    html += "</ul>";
    return html;
};

$(document).ready(function () {

    var id_padre = getParameterByName('organigrama_id_padre');
    if (id_padre == '') {
        id_padre = 1;
    }

    var dataJSON = [
//        {"id": "1", "parentid": "20", "name": "Presidencia"},
//        {"id": "2", "parentid": "1", "name": "Asesoría"},
//        {"id": "3", "parentid": "1", "name": "Área de "},
//        {"id": "4", "parentid": "2", "name": "Área de "}
    ];

    if (typeof parent.dataJSON !== 'undefined') {

        dataJSON = parent.dataJSON;
    }

    resultado = _queryTreeSort({
        q: dataJSON
    });

    var treeBD;
    treeBD = _makeTree({
        q: resultado
    });

    var html_arbol = _renderTree(treeBD);

    var margin = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 30
    },
            width = $(".org-chart.cf").width() - margin.right - margin.left,
            height = 1200 - margin.top - margin.bottom;

    var i = 0,
            duration = 750,
            root;

    var tree = d3.layout.tree()
            .size([width, height])
            .separation(function separation(a, b) {
                return (a.parent == b.parent ? 1 : 2) * a.depth;
            });

    var diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.x, d.y];
            });

    var svg = d3.select(".org-chart").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            //.attr("viewbox", "0 0 500 500")
            .call(zm = d3.behavior.zoom().scaleExtent([0.5, 3]).on("zoom", redraw))
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .style("text-rendering", "optimizeLegibility")
            .style("shape-rendering", "default");

    var slider = d3.select(".sliderZoom").append("p").append("input")
            .datum({})
            .attr("type", "range")
            .attr("value", 1)
            .attr("min", zm.scaleExtent()[0])
            .attr("max", zm.scaleExtent()[1])
            .attr("step", (zm.scaleExtent()[1] - zm.scaleExtent()[0]) / 100)
            .on("input", slided);

    function slided(d) {
        zm.scale(d3.select(this).property("value"))
                .event(svg);
    }

    zm.translate([margin.left, margin.top]);
    var flare = treeBD[0];

    root = flare;
    root.x0 = width / 2;
    root.y0 = 0;


    function update(source) {
        var colors = ['#FF5722', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#795548'];

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);
        var profundidadArbol = getDepth(root);

        var profundidadActual = source.depth;
        // Normalize for fixed-depth.
        var indice = 0;
        var niveles = [];

        for (n = 0; n < profundidadArbol; n++) {
            niveles[n] = 0;
        }

        nodes.forEach(function (d, i) {

            niveles[d.depth] = niveles[d.depth] + 1;
            indice = niveles[d.depth];
            //console.log(d.name+":"+d.depth+":"+i+":"+indice);
            if (d.depth > 1) {
                d.y = d.depth * 200;
                if (d.parent.children.length > 2) {
                    d.y += (indice % 2) * 75;
                }

            } else if (d.depth == 1) { //primer nivel, menos separación
                d.y = d.depth * 100;
                if (d.parent.children.length > 2) {
                    d.y += (indice % 2) * 75;
                }
            } else {
                d.y = 0;
            }

        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
                .data(nodes, function (d, i) {
                    return d.id || (d.id = ++i);
                });

        // Enter any new nodes at the parent's previous position.

        var nodeEnter = node.enter();
        var grupoNodo = nodeEnter.append("g")
                .attr("class", "node")
                .attr("id", function (d) {
                    return d.id
                })
                .attr("transform", function (d, i) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                //.call(drag);
                ;

        var grupoTexto = grupoNodo.append("g")
                .attr("class", "texto");

        grupoTexto.append("circle")
                .attr("r", 1e-6)
                .on("click", click)
                .style("fill", function (d) {
                    return d._children ? "lightsteelblue" : "lightgrey";
                });


        //si tiene hijos 

        grupoTexto.append('rect')
                .on("click", click)
                .attr("x", "-75px")
                .attr("y", "5")
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", 180)
                .attr("height", 50)
                .attr("fill", "#fff")
                .attr("class", "rectangulo-hijos")
                .style("stroke", "#777")
                //.attr("transform", "rotate(-2)")
                .style("stroke-width", function (d) {
                    var hijos = 0;
                    if (d._children != null) {
                        hijos = d._children.length;
                    }
                    return (hijos <= 0) ? "0px" : "0.2px";
                });

        grupoTexto.append('rect')
                .on("click", click)
                .attr("x", "-75px")
                .attr("y", "5")
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", 180)
                .attr("height", 50)
                .attr("fill", "#fff")
                .attr("class", "rectangulo-hijos2")
                .style("stroke", "#777")
                //.attr("transform", "rotate(2)")
                .style("stroke-width", function (d) {
                    var hijos = 0;
                    if (d._children != null) {
                        hijos = d._children.length;
                    }
                    return (hijos <= 0) ? "0px" : "0.2px";
                });

        //Dibujamos el cuadro con la barra de enlaces y con el texto de cada departamento
        grupoTexto.append('rect')
                .attr("class", "barra-enlaces")
                .attr("x", "-75px")
                .attr("y", "0")
                .attr("width", 180)
                .attr("height", 5)
                .attr("fill", function (d) {
                    var hijos = 0;
                    if (d.children != null) {
                        hijos = d.children.length;
                    }

                    return colors[hijos % colors.length];
                })
                .attr("stroke", "#ccc")
                .attr("stroke-width", "0.2px");

        grupoTexto.append('a')
                .attr("x", "-50px")
                .attr("y", "10")
                .attr("xlink:href", function (d) {
                    return '/directorio?id=' + d.id;
                })
                .attr("xlink:title", "Ver directorio")
                .attr("fill", "white")
                .attr("height", 5)
                .attr("width", 180)
                .attr("font-size", 12)
                .append('text')
//                .attr("font-family", "FontAwesome")
                .attr("x", "40px")
                .attr("y", "15")
//                .text('\uf095')
                ;

        grupoTexto.append('a')
                .attr("x", "25px")
                .attr("y", "10")
//                .attr("xlink:href", function (d) {
//                    return window.location.href + "&organigrama_id_padre=" + d.id;
//                })
//                .attr("xlink:title", "Ver organigrama")
                .attr("fill", "white")
                .attr("height", 5)
                .attr("width", 180)
                .attr("font-size", 12)
                .append('text')
//                .attr("font-family", "FontAwesome")
                .attr("x", "55px")
                .attr("y", "15")
//                .text('\uf0e8')
                ;

        grupoTexto.append('rect')
                .on("click", click)
                .attr("x", "-75px")
                .attr("y", "5")
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", 180)
                .attr("height", 50)
                .attr("fill", "white")
                .classed("rectangulo-texto", true)
                .attr("stroke", "#777")
                .attr("stroke-width", "0.2px");

        grupoTexto.append('text')
                .on("click", click)
                .text(function (d, i) {
                    return d.name;
                })
                .attr("x", "0")
                .attr("text-anchor", "middle")
                .attr("y", "33")
                .attr("font-size", 11)
                .attr("fill", "#555")
                .call(wrap, 140);

        var grupoEnlaces = grupoNodo.append("g").attr("class", "nodo-enlaces");


        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    //check dx is NaN
                    if(isNaN (d.x)){
                        d.x = root.x0;
                        
                    }
                    if(isNaN (d.x0)){
                        d.x0 = root.x0;
                        
                    }
                    
                    return "translate(" + d.x + "," + d.y + ")";
                });

        nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) {
                    return d._children ? "lightsteelblue" : "lightgrey";
                });

        nodeUpdate.select("text")
                .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.x + "," + source.y + ")";
                })
                .remove();

        nodeExit.select("circle")
                .attr("r", 1e-6);

        nodeExit.select("text")
                .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id;
                });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

        // Transition links to their new position.
        link.transition()
                .duration(duration)
                .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        actualizarEventos();

    } //fin update

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }

        update(d);

    }

    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
        });
    };

    d3.selection.prototype.moveToBack = function () {
        return this.each(function () {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
            }
        });
    };

    function redraw(d) {
        $(".sliderZoom input").val(d3.event.scale);

        var escala = 1;
        var d3scale = d3.event.scale;
        escala = (d3scale > 1) ? (1.1 / d3scale) : 0.8;
        if (d3scale == 1)
            escala = 1;

        d3.selectAll(".texto").attr("transform", "scale(" + escala + ")");

        svg.attr("transform",
                "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    }

//    root.children.forEach(collapse);
    update(root);

    d3.select(self.frameElement).style("height", "600px").style("width", width);



});