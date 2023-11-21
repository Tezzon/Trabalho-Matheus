<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Clientes</h1>
            <hr/>
            <router-link to="/cliente" class="btn btn-primary">
                Novo cliente
            </router-link>
            <hr/>
        </div>
        <div class="card-body">
            <table class="table text-center">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes">
                        <td>{{ cliente.codigoCliente }}</td>
                        <td>{{ cliente.nomeCliente }}</td>
                        <td>
                            <button class="btn btn-primary" @click="consultar(cliente.codigoCliente)">Consultar</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="excluir(cliente.codigoCliente)">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import Swal from 'sweetalert2'
    import ClienteService from '../services/ClienteService' // Assuming you have a ClienteService
    import { ref, onBeforeMount } from 'vue'
    import router from '../router'

    const clienteService = new ClienteService() // Assuming you have a ClienteService instance
    const clientes = ref([])

    onBeforeMount(() => {
        listar()
    })

    function listar() {
        clienteService.listar().then((response) => {
            clientes.value = response.data
        }).catch((error) => {
            Swal.fire({
                title: "Erro",
                text: "Erro ao listar clientes",
                icon: "error",
                allowOutsideClick: false
            })
        })
    }

    function excluir(codigoCliente) {
        Swal.fire({
            title: "Atenção",
            text: "Deseja realmente excluir este cliente?",
            icon: "question",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            allowOutsideClick: false
        }).then((response) => {
            if (response.isConfirmed) {
                clienteService.excluir(codigoCliente)
                    .then((response) => {
                        Swal.fire({
                            title: "Sucesso",
                            text: "Cliente excluído com sucesso!",
                            icon: "success"
                        }).then((response) => {
                            if (response.isConfirmed) {
                                listar()
                            }
                        })
                    }).catch((error) => {
                        Swal.fire({
                            title: "Erro",
                            text: "Erro ao excluir cliente",
                            icon: "error"
                        })
                    })
            }
        })
    }

    function consultar(codigoCliente) {
        router.push(`/cliente/${codigoCliente}`)
    }
</script>
