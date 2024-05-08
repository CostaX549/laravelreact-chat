import React from 'react';
import { Feature } from '@/Components';


const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature
        title="UnitauChat: Conectando Alunos e Professores"
        text="O UnitauChat é uma plataforma inovadora que permite a troca de mensagens entre alunos e professores, facilitando a comunicação dentro e fora da sala de aula. Com recursos avançados, como chatbots, base de conhecimento e suporte para educação, o UnitauChat abre novas possibilidades de aprendizado e colaboração."
      />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">Explore as Possibilidades</h1>
      <p>Descubra tudo o que o UnitauChat tem a oferecer</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature
        title="Chatbots Inteligentes"
        text="Os chatbots do UnitauChat estão prontos para ajudar a responder suas perguntas e fornecer suporte instantâneo."
      />
      <Feature
        title="Base de Conhecimento"
        text="Acesse uma vasta base de conhecimento para obter respostas rápidas e informações úteis sobre diversos tópicos."
      />
      <Feature
        title="Suporte para Educação"
        text="Além de facilitar a comunicação, o UnitauChat oferece suporte para educação, permitindo a realização de tarefas, envio de materiais e muito mais."
      />
    </div>
  </div>
);

export default WhatGPT3;
