import axiosConfig from '../config/AxiosConfig'

class ClienteService {

    inserir(cliente) {
        return axiosConfig.post("cliente", cliente);
    }

    alterar(cliente) {
        return axiosConfig.put("cliente", cliente);
    }

    listar() {
        return axiosConfig.get("cliente");
    }

    consultar(codigoCliente) {
        return axiosConfig.get(`cliente/${codigoCliente}`);
    }

    excluir(codigoCliente) {
        return axiosConfig.delete(`cliente/${codigoCliente}`);
    }
}

export default ClienteService;
