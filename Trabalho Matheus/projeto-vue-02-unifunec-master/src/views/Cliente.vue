<template>
    <div class="card position-absolute w-75 top-50 start-50 translate-middle shadow">
        <div class="card-header text-center">
            <h1>Formulário do cliente</h1>
            <hr/>
            <router-link to="/" class="btn btn-secondary">
                Voltar
            </router-link>
            <hr/>
        </div>
        <div class="card-body">
            <form @submit.prevent="gravar()">
                <div>
                    <label for="codigoCliente">Código:</label>
                    <input type="text" class="form-control" 
                    readonly v-model="cliente.codigoCliente"/>
                </div>
                <div class="mt-3">
                    <label for="nomeCliente">Nome:</label>
                    <input type="text" class="form-control" 
                    required v-model="cliente.nomeCliente"/>
                </div>
                <div class="mt-3 text-center">
                    <button type="submit" class="btn btn-success">Gravar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { ref, onBeforeMount } from 'vue'
    import ClienteService from '../services/ClienteService'
    import Swal from 'sweetalert2'
    import router from '../router'

    const codigoCliente = useRoute().params.codigoCliente
    const clienteService = new ClienteService()
    const erros = ref(null)
    const cliente = ref({
        codigoCliente: '',
        nomeCliente: ''
    })

    onBeforeMount(() => {
        if(codigoCliente) {
            consultar(codigoCliente)
        }
    })

    function consultar(codigoCliente) {
        clienteService.consultar(codigoCliente).then((response) => {
            cliente.value = response.data
        }).catch((error) => {
            Swal.fire({title: "Erro", text: error.response.data.mensagem,
            icon: "error", allowOutsideClick: false})
        })
    }

    function gravar() {
        if(cliente.value.codigoCliente) {
            clienteService.alterar(cliente.value).then((response) => {
                Swal.fire({title: "Sucesso", text: "Cliente alterado com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao alterar cliente",
                icon: "error", allowOutsideClick: false})
            })
        } else {
            clienteService.inserir(cliente.value).then((response) => {
                Swal.fire({title: "Sucesso", text: "Cliente inserido com sucesso",
                icon: "success", allowOutsideClick: false}).then((response) => {
                    if(response.isConfirmed) {
                        router.push("/")
                    }
                })
            }).catch((error) => {
                erros.value = error.response.data.mensagem
                Swal.fire({title: "Erro", text: "Erro ao inserir cliente",
                icon: "error", allowOutsideClick: false})
            })
        }
    }
</script>
