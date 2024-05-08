import React from 'react';


const Header = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">UnitauChat: Facilitando a Interação e Colaboração Acadêmica</h1>
        <p>O UnitauChat é uma plataforma inovadora projetada para melhorar a colaboração e interação entre alunos e professores na realização de tarefas acadêmicas. Com recursos avançados de chat e colaboração em tempo real, o UnitauChat simplifica a comunicação entre todos os envolvidos no processo educacional.</p>

        <div className="gpt3__header-content__input">
           <input type="email" placeholder="Digite seu e-mail acadêmico" />
           <button type="button">Começar</button>
        </div>
        <div className="gpt3__header-content__people">
           <img  src="/assets/people.png" alt="people" />
           <p>Mais de 1.600 pessoas solicitaram acesso nas últimas 24 horas.</p>
        </div>
       
      </div>
      <div className="gpt3__header-image">
          <img src="/assets/estudioso.png" alt="ai" />
      </div> 
    </div>
  );
}

export default Header;
