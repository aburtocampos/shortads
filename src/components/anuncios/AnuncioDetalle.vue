<template>
  <section class="anunciocardcontainer">
    <div v-if="anuncio" class="card anunciocard mb-3">
      <div class="card-heading d-flex align-items-center">
        <button type="button" class="btn btn-link p-0 me-2 text-decoration-none" @click="cancel">
          <i class="bi bi-arrow-bar-left"></i> Atras
        </button>
        <h5 class="card-title m-0 text-uppercase">{{ anuncio.titulo }}</h5>
      </div>
      <div class="card-body">
      
        <p class="card-text">{{ anuncio.descripcion }}</p>
        <p v-if="anuncio.precio" class="card-text text-muted">Precio: {{ anuncio.precio }}</p>
      </div>
    </div>
    <div v-else class="text-center">
       <p>Cargando anuncio...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useAnunciosStore } from '../../stores/anuncios';

 // Recibe el anuncio como prop
 const props = defineProps({
    anuncioProp: {
      type: Object,
      required: true,
    },
    cancelRoute: {
    type: String,
    required: false, // Ruta de cancelación
  },
  });


const anuncio = ref(null);
const route = useRoute();
const router = useRouter();
const anunciosStore = useAnunciosStore();

const emit = defineEmits(['cancel']);


console.log("route.query.returnTo",route.query.returnTo);

onMounted(async () => {
  // Si el anuncio no se pasa como prop, búscalo en el store por ID
  if (!props.anuncioProp) {
    const id = route.params.id; // Obtener el ID de la ruta
    anuncio.value = anunciosStore.anuncios.find((a) => a.id === id);
    if (!anuncio.value) {
      // Opcional: Si no está en el store, cargar desde el backend
      await anunciosStore.loadAnuncios();
      anuncio.value = anunciosStore.anuncios.find((a) => a.id === id);
    }
  } else {
    anuncio.value = props.anuncioProp;
  }
  console.log("anuncio",anuncio);
});

function cancel() {

  if (props.cancelRoute) {
    router.push(props.cancelRoute); // Redirigir a la ruta especificada
  } else {
    const returnTo = route.query.returnTo || '/anuncios/mis-anuncios'; // Ruta predeterminada
    router.push(returnTo);
  }
}


</script>

<style scoped>
.card-heading{
  padding: 1rem 1rem 0rem 1rem;
}
.anunciocardcontainer{
  display: flex;
  justify-content: center;
}
.anunciocard{
width: 100%;
}

@media(min-width:768px){
  .anunciocard{
    width: calc(100vw - 20%);
  }
}
@media(min-width:992px){
  .anunciocard{
    width: calc(100vw - 30%);
  }
}
@media(min-width:1100px){
  .anunciocard{
    width: calc(100vw - 50%);
  }
}
</style>