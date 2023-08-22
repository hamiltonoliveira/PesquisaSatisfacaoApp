Pesquisa de Satisfação
Instalação
Para começar, siga estas etapas para instalar e executar o aplicativo:

Clone este repositório: git clone https://github.com/hamiltonoliveira/PesquisaSatisfacaoApp.git
Navegue até o diretório do projeto.
Instale as dependências: npm install
Inicie o servidor de desenvolvimento.
Acesse o aplicativo em seu navegador através do link http://localhost:4200/.

Recursos
Responsivo: Este aplicativo é totalmente responsivo e se adapta a diferentes tamanhos de tela, proporcionando uma experiência consistente em dispositivos móveis e desktops.
Campos Obrigatórios: Antes de enviar os dados para o servidor, verifique se os campos de e-mail e senha foram preenchidos. Caso contrário, o aplicativo exibirá uma mensagem de erro.
Autenticação JWT: O aplicativo usa autenticação JWT (JSON Web Token) para fornecer segurança durante o processo de login. Dois tokens JWT são retornados ao usuário: um para autenticação e outro para renovação quando a data de uso no sistema estiver prestes a expirar.
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas. Certifique-se de seguir as diretrizes de contribuição do projeto.

Licença
Este projeto está licenciado sob a licença Hamilton Vale.

Observação: Uma vez que o JWT gerado pelo backend estiver salvo no localstorage, ao abrir o navegador, a tela de cadastro de enquetes será exibida como a principal. Caso não haja um JWT, o usuário será solicitado a realizar o cadastro. Essa regra foi criada para facilitar a experiência do usuário.

