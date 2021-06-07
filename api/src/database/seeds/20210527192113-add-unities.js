module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'unity',
      [
        {
          name: 'Centro de Tecnologia',
          location:
            'Av. Athos da Silveira Ramos, 149 - Bloco A, 1 andar - Cidade Universitária da Universidade Federal do Rio de Janeiro, Rio de Janeiro - RJ, 21941-909',
          capacity: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Faculdade de Letras',
          location:
            'Av. Horácio Macedo, 2151 - Cidade Universitária da Universidade Federal do Rio de Janeiro, Rio de Janeiro - RJ, 21941-917',
          capacity: 20,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Unidade Central',
          location:
            'Av. Carlos Chagas Filho, s/n - Cidade Universitária da Universidade Federal do Rio de Janeiro, Rio de Janeiro - RJ, 21044-020',
          capacity: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
