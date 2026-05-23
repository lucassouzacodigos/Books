import { useState } from "react";

export default function UserUpdateForm(){
    const [imagePreview, setImagePreview] = useState()

    function handlePhoto(e) {
        const {name, files} = e.target

        if(name === 'image' && files && files[0]){
            const selectedImage = files[0]
            setImagePreview(URL.createObjectURL(files[0]))
            saveImage(selectedImage)
        }
    }
}

async function saveImage(selectedImage) {
  if (!selectedImage) {
    alert('Selecione uma imagem antes de enviar.');
    return;
  }

  try {
    const tokenJWT = sessionStorage.getItem('token');

    if (!tokenJWT) {
      alert('Token JWT não encontrado. Faça login novamente.');
      return;
    }

    const formData = new FormData();

    // nome do campo deve bater com o backend
    formData.append('uploads', selectedImage);

    const response = await api.post('/upload', formData, {
      headers: {
        Authorization: `${tokenJWT}`,
      },
    });

    console.log('Resposta:', response.data);

    toast.success('Imagem enviada com sucesso!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  } catch (error) {
    console.log('Erro:', error.response?.data || error.message);

    toast.error('Erro ao enviar a imagem. Tente novamente.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
}