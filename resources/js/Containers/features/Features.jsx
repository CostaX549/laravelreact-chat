import React from 'react';
import './features.css';
import { Feature } from '@/Components';

const featuresData = [
  {
    title: 'Conexão Instantânea',
    text: 'Com o Unitau Chat, alunos e professores podem se conectar instantaneamente, facilitando a comunicação e a colaboração em tempo real.'
  },
  {
    title: 'Colaboração Eficiente',
    text: 'O Unitau Chat oferece ferramentas avançadas de colaboração, como salas de bate-papo em grupo, compartilhamento de arquivos e recursos, tornando o trabalho em equipe mais eficiente e produtivo.'
  },
  {
    title: 'Acesso a Recursos Educacionais',
    text: 'Além de promover a interação entre alunos e professores, o Unitau Chat disponibiliza uma ampla variedade de recursos educacionais, incluindo materiais de estudo, notas de aula e links úteis para enriquecer o aprendizado.'
  },
  {
    title: 'Suporte Personalizado',
    text: 'Com recursos de chat ao vivo e suporte técnico integrado, o Unitau Chat oferece suporte personalizado para garantir uma experiência de uso tranquila e satisfatória.'
  }
];

const Features = () => {
  return (
    <div className="gpt3__features section__padding" id="unitauchat">
      <div className="gpt3__features-heading">
        <h1 className="gradient__text">Descubra o Unitau Chat: Transformando a Educação através da Tecnologia</h1>
        <p>Solicite Acesso Antecipado para Começar</p>
      </div>
      <div className="gpt3__features-container">
        {featuresData.map((item, index) => (
          <Feature title={item.title} text={item.text} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Features;
