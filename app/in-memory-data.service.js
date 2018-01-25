"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'FUlano de tal', email: 'fulano@gmail.com', telefone: '(88)0000-0000' },
            { id: 2, nome: 'Pereira', email: 'pereira@gmail.com', telefone: '(88)8888-0000' },
            { id: 3, nome: 'Batista', email: 'batista@gmail.com', telefone: '(88)1111-0000' },
            { id: 4, nome: 'Neto', email: 'neto@gmail.com', telefone: '(88)2222-0000' },
            { id: 5, nome: 'Antonio', email: 'antonio@gmail.com', telefone: '(88)3333-0000' },
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map