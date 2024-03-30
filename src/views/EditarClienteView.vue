<script setup>
    import { onMounted } from 'vue'
    import { FormKit } from '@formkit/vue'
    import { useRouter, useRoute } from 'vue-router';
    import ClientesService from '@/services/ClientesService';
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue'
    
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;

    const cliente = onMounted (()=>{
        ClientesService.obtenerCliente(id)
            .then(({data})=> console.log(data))
            .catch(error => console.log(error));
    });

    defineProps({
        titulo:{
            type:String,
        }
    })
</script>
<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="listado-clientes">Volver</RouterLink>
        </div>
        <Heading> {{ titulo  }}a</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    submit-label="Agregar Cliente"
                    incomplete-message="No se pudo procesar tu peticion"
                    @submit="handleSubmit"

                >
                    <FormKit type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre de cliente"
                        validation="required"
                        :validation-messages="{ required:'El nombre del cliente es obligatorio'}"
                    />
                
                    <FormKit type="text"
                        label="Apellidos"
                        name="apellidos"
                        placeholder="Apellido"
                        validation="required"
                        :validation-messages="{ required:'Los Apellidos del cliente es obligatorio'}"
                    />
                    <FormKit type="email"
                        label="Email"
                        name="email"
                        placeholder="Emai"
                        validation="required|email"
                        :validation-messages="{ required:'El E-mail del cliente es obligatorio', email:'Ingrese un email valido'}"
                    />

                    <FormKit type="text"
                        label="Telefono"
                        name="telefono"
                        placeholder="Telefono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches:'El formato no es valido'}"
                    />

                    <FormKit type="text"
                        label="Empresa"
                        name="empresa"
                        placeholder="Empresa del cliente"
                    />

                    <FormKit type="text"
                        label="Puesto"
                        name="puesto"
                        placeholder="Puesto del cliente"
                    />


                </FormKit>
            </div>
        </div>

    </div>
</template>
<style>
    .formkit-wrapper{
        max-width: 100%;
    }
</style>