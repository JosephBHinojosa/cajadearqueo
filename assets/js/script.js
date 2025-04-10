document.addEventListener("DOMContentLoaded", function () {
    let valores = [1, 2, 5, 10, 20, 50, 100, 200];
    let index = 0;
    let billetes = [];

    const billeteImg = document.getElementById("billete-img");
    const billeteValorInput = document.getElementById("billete-valor");
    const cantidadInput = document.getElementById("cantidad-input");
    const tablaBody = document.getElementById("tabla-body");
    const totalGeneralElement = document.getElementById("total-general");

    function mostrarBillete() {
        billeteImg.src = `assets/billetes/${valores[index]}.jpg`;
        billeteValorInput.value = valores[index];
    }

    document.getElementById("btn-anterior").addEventListener("click", function () {
        if (index > 0) index--;
        mostrarBillete();
    });

    document.getElementById("btn-siguiente").addEventListener("click", function () {
        if (index < valores.length - 1) index++;
        mostrarBillete();
    });

    document.getElementById("btn-agregar").addEventListener("click", function () {
        let valor = parseInt(billeteValorInput.value);
        let cantidad = parseInt(cantidadInput.value);
        if (cantidad > 0) {
            let encontrado = billetes.find(b => b.valor === valor);
            if (encontrado) {
                encontrado.cantidad += cantidad;
                encontrado.total = encontrado.valor * encontrado.cantidad;
            } else {
                billetes.push({ valor, cantidad, total: valor * cantidad });
            }
            cantidadInput.value = "";
            actualizarTabla();
        }
    });

    function actualizarTabla() {
        tablaBody.innerHTML = "";
        let totalGeneral = 0;

        billetes.forEach((billete, index) => {
            let total = billete.valor * billete.cantidad;
            billete.total = total;
            totalGeneral += total;

            let row = `
                <tr>
                    <td><img src="assets/billetes/${billete.valor}.jpg" class="billete"></td>
                    <td><input type="number" data-index="${index}" value="${billete.cantidad}" min="0" class="cantidad-edit"></td>
                    <td>${total.toFixed(2)} Bs</td>
                </tr>
            `;
            tablaBody.innerHTML += row;
        });

        totalGeneralElement.textContent = totalGeneral.toFixed(2) + " Bs";

        // Asociar eventos a los inputs para edición en vivo
        document.querySelectorAll(".cantidad-edit").forEach(input => {
            input.addEventListener("change", function () {
                let idx = parseInt(this.dataset.index);
                let nuevaCantidad = parseInt(this.value);
                if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
                    billetes[idx].cantidad = nuevaCantidad;
                    billetes[idx].total = billetes[idx].valor * nuevaCantidad;
                    actualizarTabla();
                }
            });
        });

        enviarDatosAlServidor();
    }

    function enviarDatosAlServidor() {
        fetch("arqueo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ billetes })
        });
    }

    document.getElementById("btn-actualizar").addEventListener("click", actualizarTabla);

    document.getElementById("btn-borrar").addEventListener("click", function () {
        billetes = [];
        actualizarTabla();
    });

    mostrarBillete();
});
