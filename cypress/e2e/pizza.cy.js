
// 1. TEST = ÇALIŞIYOR - DATA-CY KULLANDIM.
// 2. TEST = ÇALIŞMIYOR - ÇOKLU MALZEME SEÇİMİ. (DATA-CY DAHIL HİÇBİR YÖNTEM ÇALIŞMADI. ATTRIBUTE-ID ya da CONTAIN HİÇBİRİSİ OLMADI)
// 3. TEST = ÇALIŞMIYOR - İSİM GİRİŞİ + SİPARİŞ NOTU + HAMUR SEÇİMİ + PİZZA BOYUTU ÇALIŞIYOR. ÇOKLU MALZEME SEÇİMİ ÇALIŞMIYOR.

// ÇOKLU MALZEME SEÇİMİNİ GERÇEKLEŞTİREN CYPRESS TESTİNİ BİR TÜRLÜ ÇALIŞTIRAMADIM.

//1. Cypress Testi
describe('Inputa Metin Girişi', () => {
  it('should input text in the customer name field', () => {
    cy.visit('http://localhost:5173/SiparisFormu');

    cy.get('[data-cy="customerNameInput"]')
      .type('John Doe')
      .should('have.value', 'John Doe');
  });
});

//2. Cypress Testi
describe('Çoklu Malzeme Seçimi', () => {
  it('should select multiple toppings', () => {
    cy.visit('http://localhost:5173/SiparisFormu');

    cy.get('[data-cy="malzeme-pepperoni"]').click();
    cy.get('[data-cy="malzeme-sosis"]').click();
    cy.get('[data-cy="malzeme-jalepeno"]').click();
  });
});

//3. Cypress Testi
describe('Formu Gönderen Test', () => {
  it('should submit the form successfully', () => {
    cy.visit('http://localhost:5173/SiparisFormu');

    cy.get('[data-cy="customerNameInput"]')
    .type('John Doe')
    .should('have.value', 'John Doe');

    cy.get('input[value="Orta"]').click();

    cy.get('select[name="pizzaHamuru"]').select('İnce Hamur');

    cy.get('textarea[name="siparisNotu"]')
      .type('Lütfen acı sos koymayın.')
      .should('have.value', 'Lütfen acı sos koymayın.');

    cy.get('[data-cy="artir"]').click();

    cy.get('[data-cy="malzeme-pepperoni"]').click();
    cy.get('[data-cy="malzeme-sosis"]').click();



    cy.get('[data-cy="submit"]').click();

    cy.url().should('include', '/SiparisAlindi');

    cy.get('input[name="customerName"]').should('have.value', '');
    cy.get('input:checked').should('have.length', 0);
    cy.get('select').should('have.value', '');
    cy.get('textarea[name="siparisNotu"]').should('have.value', '');
  });
});