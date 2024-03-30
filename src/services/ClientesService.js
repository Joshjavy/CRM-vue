import api from "@/lib/axios";

export default{
    obtenerClientes(){
        return api.get('/clientes');
    },
    agregarCliente(data){
        return api.post('/clientes',data)
    },

    obtenerCliente(id){
        return api.get('clientes/'+id);
    },
    actializarCliente(id,data){
        return api.patch('/clientes/' + id, data)
    },
    cambiarEstadoCliente(id,data){
        return api.patch('/clientes/'+id ,data)
    },
    eliminarCliente(id,data){
        return api.delete('/clientes/'+ id)
    }

}