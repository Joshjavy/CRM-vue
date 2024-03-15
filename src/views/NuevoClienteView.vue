<script setup>
    import axios from 'axios';
    import { FormKit } from '@formkit/vue'
    import { useRouter} from 'vue-router';
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue'
    
    const router = useRouter();
    console.log(router);

    defineProps({
        titulo:{
            type:String,
        }
    })

    const handleSubmit=(data)=>{
        axios.post('http://localhost:4000/clientes',data)
            .then(respuesta => {
                console.log(respuesta)
                //redireccionar
                router.push({ name:'inicio'});
                
            })
            .catch(error => console.log(error));

    }
</script>
<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="inicio">Volver</RouterLink>
        </div>
        <Heading> {{ titulo  }}</Heading>

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