<script setup>
    import { onMounted,reactive } from 'vue'
    import { FormKit } from '@formkit/vue'
    import { useRouter, useRoute } from 'vue-router';
    import ClientesService from '@/services/ClientesService';
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue'
    
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;

    //const formData = reactive({
    //   nombre:'',
    //    apellidos:'',
    //    email:'',
    //    telefono:'',
    //    empresa:'',
    //    puesto:'',
    //})
    const formData = reactive({})
    //const formData = ref({})

    onMounted (()=>{
        ClientesService.obtenerCliente(id)
            .then(({data})=>{
                Object.assign(formData, data);//reactive
                // formData.value = data //ref
                //formData.nombre = data.nombre
                //formData.apellidos= data.apellidos
                //formData.email= data.email
                //formData.telefono= data.telefono
                //formData.empresa= data.empresa
                //formData.puesto= data.puesto
            })
            .catch(error => console.log(error));
    });

    defineProps({
        titulo:{
            type:String,
        }
    })

    const handleSubmit = (data)=>{
        ClientesService.actializarCliente(id,data)
            .then(()=> router.push({name:'listado-clientes'}))
            .catch(error=>console.log(error));
    }

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
                    submit-label="Guardar Cambios"
                    incomplete-message="No se pudo procesar tu peticion"
                    @submit="handleSubmit"
                    :value="formData"

                >
                    <FormKit type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre de cliente"
                        validation="required"
                        :validation-messages="{ required:'El nombre del cliente es obligatorio'}"
                        v-model="formData.nombre"
                    />
                
                    <FormKit type="text"
                        label="Apellidos"
                        name="apellidos"
                        placeholder="Apellido"
                        validation="required"
                        :validation-messages="{ required:'Los Apellidos del cliente es obligatorio'}"
                        v-model="formData.apellidos"
                    />
                    <FormKit type="email"
                        label="Email"
                        name="email"
                        placeholder="Emai"
                        validation="required|email"
                        :validation-messages="{ required:'El E-mail del cliente es obligatorio', email:'Ingrese un email valido'}"
                        v-model="formData.email"
                    />

                    <FormKit type="text"
                        label="Telefono"
                        name="telefono"
                        placeholder="Telefono: XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches:'El formato no es valido'}"
                        v-model="formData.telefono"
                    />

                    <FormKit type="text"
                        label="Empresa"
                        name="empresa"
                        placeholder="Empresa del cliente"
                        v-model="formData.empresa"
                    />

                    <FormKit type="text"
                        label="Puesto"
                        name="puesto"
                        placeholder="Puesto del cliente"
                        v-model="formData.puesto"
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