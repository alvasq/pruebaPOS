var codigoQR
var app = angular.module('MyApp', [])
app.controller('MyController', function ($scope) {

    $scope.SelectFile = function (e) {
        $scope.f = e.target.files[0];
        $scope.r = new FileReader();
        $scope.r.readAsText($scope.f);
        $scope.r.onload = function () {
            $scope.$apply(function () {
                $scope.xmlFinal = $scope.r.result;
                $scope.xmlDoc = jQuery.parseXML($scope.xmlFinal);
                $scope.ejectuar();
            })
        }
    }
    $scope.SRCimagen = "";
    $scope.addIMG = function () {
        $scope.file = document.getElementById('inputFile1').files[0];
        $scope.reader = new FileReader();

        $scope.reader.onload = function (event) {
            $scope.$apply(function () {
                // $scope.img = document.getElementById('img1');
                // $scope.img.src= event.target.result;
                $scope.SRCimagen = event.target.result;
                // console.log($scope.img.src)
                console.log($scope.SRCimagen)
            })
        }
        $scope.reader.readAsDataURL($scope.file);
    }

    $scope.ejectuar = function () {
        $scope.datosGene = ($scope.xmlDoc).getElementsByTagName('dte:DatosGenerales')[0]
        $scope.tipoFact = $scope.datosGene.getAttributeNode("Tipo");
        $scope.fecha = ($scope.datosGene).getAttributeNode("FechaHoraEmision").value;
        $scope.emisor = $scope.xmlDoc.getElementsByTagName('dte:Emisor')[0];
        $scope.nombreCom = ($scope.emisor).getAttributeNode("NombreComercial").value;
        $scope.nit = ($scope.emisor).getAttributeNode("NITEmisor").value;
        $scope.nombreEmi = ($scope.emisor).getAttributeNode("NombreEmisor").value;
        $scope.direccionEmisor = ($scope.emisor).getElementsByTagName("dte:DireccionEmisor")[0];
        $scope.direccion = $scope.direccionEmisor.getElementsByTagName("dte:Direccion")[0].childNodes[0];
        $scope.direccionF = ($scope.direccion.nodeValue);
        // $scope.Municipio=(($scope.direccionEmisor).getElementsByTagName("dte:Municipio")[0].childNodes[0]).value;
        // //document.getElementById("municipio").innerHTML = Municipio.nodeValue+",";
        // $scope.Departamento=(($scope.direccionEmisor).getElementsByTagName("dte:Departamento")[0].childNodes[0]).value;
        // //document.getElementById("departamento").innerHTML = Departamento.nodeValue;
        $scope.valCert = ($scope.xmlDoc).getElementsByTagName("dte:Certificacion")[0];
        $scope.nombreCert = ($scope.valCert).getElementsByTagName("dte:NombreCertificador")[0].childNodes[0];
        $scope.nitCert = ($scope.valCert).getElementsByTagName("dte:NITCertificador")[0].childNodes[0];
        $scope.numbAut = ($scope.valCert).getElementsByTagName("dte:NumeroAutorizacion")[0];
        $scope.numbFac = "No. " + ($scope.numbAut).getAttributeNode("Numero").nodeValue;
        $scope.serieFact = "Serie: " + ($scope.numbAut).getAttributeNode("Serie").nodeValue;
        var tipoFactF = $scope.tipoFact.value;
        if (tipoFactF == "FACT") {
            $scope.fact = "Factura Electrónica";
        }
        else {
            if (tipoFactF == "FPEQ") {
                $scope.fact = "Factura Pequeño Contribuyente";
            }
        }
        $scope.divisorCli = "----------DATOS DEL CLIENTE:----------";
        $scope.receptor = $scope.xmlDoc.getElementsByTagName('dte:Receptor')[0];
        $scope.nombreRecep = $scope.receptor.getAttributeNode("NombreReceptor").value;
        $scope.nitRecep = $scope.receptor.getAttributeNode("IDReceptor").value;
        $scope.direccionReceptor = $scope.receptor.getElementsByTagName("dte:DireccionReceptor")[0];
        if ($scope.direccionReceptor == undefined) {
            console.log("Sin Dirección");
        } else {
            $scope.direccion2 = ($scope.direccionReceptor).getElementsByTagName("dte:Direccion")[0].childNodes[0];
            $scope.direccion2 = $scope.direccion2.nodeValue;
        }
        $scope.listaProductos = $scope.xmlDoc.getElementsByTagName("dte:Items")[0];
        $scope.lProductos = $scope.listaProductos.getElementsByTagName("dte:Item");
        $scope.x = {}
        function Productos(cantidad, descripcion, precioUnitario, descuento, precio) {
            this.cantidad = cantidad;
            this.descripcion = descripcion;
            this.precioUnitario = precioUnitario;
            this.descuento = descuento;
            this.precio = precio
        }
        for (let index = 0; index < $scope.lProductos.length; index++) {
            $scope.cantidad = parseFloat(($scope.lProductos[index]).getElementsByTagName("dte:Cantidad")[0].childNodes[0].nodeValue);
            $scope.descripcion = ($scope.lProductos[index]).getElementsByTagName("dte:Descripcion")[0].childNodes[0].nodeValue;
            $scope.precioUnitario = parseFloat($scope.lProductos[index].getElementsByTagName("dte:PrecioUnitario")[0].childNodes[0].nodeValue).toFixed(2);
            $scope.descuento = parseFloat($scope.lProductos[index].getElementsByTagName("dte:Descuento")[0].childNodes[0].nodeValue).toFixed(2);
            $scope.precio = parseFloat($scope.lProductos[index].getElementsByTagName("dte:Precio")[0].childNodes[0].nodeValue).toFixed(2);
            $scope.x[index] = new Productos($scope.cantidad, $scope.descripcion, $scope.precioUnitario, $scope.descuento, $scope.precio)
        }
        $scope.totales = $scope.xmlDoc.getElementsByTagName("dte:Totales")[0];
        $scope.grantotal = parseFloat($scope.totales.getElementsByTagName("dte:GranTotal")[0].childNodes[0].nodeValue).toFixed(2);
        //datos de certificación
        $scope.valCert = $scope.xmlDoc.getElementsByTagName("dte:Certificacion")[0];
        $scope.nombreCert = $scope.valCert.getElementsByTagName("dte:NombreCertificador")[0].childNodes[0].nodeValue;
        $scope.nitCert = $scope.valCert.getElementsByTagName("dte:NITCertificador")[0].childNodes[0].nodeValue;
        $scope.numbAut = $scope.valCert.getElementsByTagName("dte:NumeroAutorizacion")[0].childNodes[0].nodeValue;
        console.log($scope.numbAut);
        $scope.documento = $scope.xmlDoc.getElementsByTagName("dte:DatosEmision")[0];
        $scope.documento2 = $scope.documento.getElementsByTagName("dte:Frases")[0];
        $scope.documento = $scope.documento2.getElementsByTagName("dte:Frase");
        $scope.cantfrase = $scope.documento.length;
        $scope.regimen = "";
        $scope.frases = $scope.documento[0];
        $scope.tipo = parseInt($scope.frases.getAttributeNode("TipoFrase").value);
        $scope.cod = parseInt($scope.frases.getAttributeNode("CodigoEscenario").value);
        validarRegimen();
        codigoQR = "https://felpub.c.sat.gob.gt/verificador-web/publico/vistas/verificacionDte.jsf?tipo=autorizacion&numero=" + $scope.numbAut + "&emisor=" + $scope.nit + "&receptor=" + $scope.nitRecep + "&monto=" + $scope.grantotal;
        crearQR();
        console.log(codigoQR);
        function validarRegimen() {
            console.log("tipo " + $scope.tipo);
            console.log("cod " + $scope.cod);
            if ($scope.tipo == 1) {
                if ($scope.cod == 1) {
                    $scope.regimen = "Sujeto a pagos trimestrales ISR";
                } if ($scope.cod == 2) {
                    $scope.regimen = "Sujeto a retención definitiva ISR";
                } if ($scope.cod == 3) {
                    $scope.regimen = "Sujeto a pago directo ISR";
                } if ($scope.cod == 4) {
                    $scope.regimen = "Exento del ISR";
                }
            }
            else {
                if ($scope.tipo == 2) {
                    if ($scope.cod == 1) {
                        $scope.regimen = "Agente de Retención del IVA";
                    }
                }
                else {
                    if ($scope.tipo == 3) {
                        if ($scope.cod == 1) {
                            $scope.regimen = "No genera derecho a crédito fiscal";
                        }
                    }
                    else {
                        $scope.regimen = "Regimen especial informar a la plataforma"
                    }
                }
            }
        }
        if ($scope.documento[1]) {
            $scope.frases = $scope.documento[1];
            $scope.tipo = parseInt($scope.frases.getAttributeNode("TipoFrase").value);
            $scope.cod = parseInt($scope.frases.getAttributeNode("CodigoEscenario").value);
            $scope.regimen1 = $scope.regimen;
            validarRegimen();
            $scope.regimen2 = $scope.regimen;
        } else {
            $scope.regimen1 = $scope.regimen;
        }
        // $scope.textopieF = document.getElementById("piedepagina").value;

    }
}

);

