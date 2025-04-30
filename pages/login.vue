<script setup lang="ts">

</script>

<template>
    <main class="bg-[url(/img/fundo.jpeg)] w-screen h-screen bg-center bg-cover bg-no-repeat flex flex-col items-center justify-evelyn">
        <figure class="w-[80%] h-[30vh] overflow-hidden md:w-[50%]">
            <img src="/img/logo.png" alt="uma foto de uma caveira com cabelo penteado  duas navalhas formando um x e  duas tesouras, com o testo barbearia navalha de ouro" class="w-[90%] m-auto ">
        </figure>
        <form class="w-[90%] h-[40vh] bg-[#0303039c] flex flex-col justify-evenly items-center rounded-4xl md:w-[50%] md:h-[30vh]">
            <label for="user" class="w-[90%] h-[45px] border-2 rounded-md border-[#c6a765] overflow-hidden flex">
                <span class="w-[15%]"><img src="/img/tesoura.png" alt="icone de uma tesoura" class="w-[100%] bg-[#c6a765]"></span>
                <input type="text" name="user" id="user" placeholder="Digite seu usuario" class="w-[85%] text-center uppercase font-semibold outline-none text-[#ffca57] ">
            </label>

            <label for="user" class="w-[90%] h-[45px] border-2 rounded-md border-[#c6a765] overflow-hidden flex]">
                <span class="w-[15%] bg-[#c6a765]"><img src="/img/navalha.png" alt="icone de uma tesoura" class="w-[80%]"></span>
                <input type="password" name="user" id="user" placeholder="**********" class="w-[85%] text-center uppercase font-semibold outline-none text-[#c6a765] ">
            </label>
            <section class="w-full flex justify-evenly">
                <button type="submit" class="uppercase border w-[150px] h-[50px] rounded-xl font-bold tracking-wider bg-[#c6a765] border-none cursor-pointer hover:bg-gray-700 hover:text-[#c6a765] "> Entrar</button>
                <button class="uppercase border w-[150px] h-[50px] rounded-xl font-bold tracking-wider bg-[#c6a765] border-none cursor-pointer hover:bg-gray-700 hover:text-[#c6a765]"><nuxt-link to="/signup" >Cadastre-se</nuxt-link></button>
            </section>
        </form>
    </main>
</template>