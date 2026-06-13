import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AutomationExercisePage } from "../../pages/AutomationExercisePage";

const page = new AutomationExercisePage();
const randomSearchTerms = ["Dress", "Tshirt", "Top", "Men", "Jeans", "Shirt"];

Given("que acesso o site {string}", (url) => {
  cy.visit(url);
});

Given("crio um novo usuário com dados randômicos", () => {
  const timestamp = Date.now();
  const randomName = `TesteUsuario${timestamp}`;
  const randomEmail = `teste${timestamp}@mailinator.com`;
  const randomPassword = `Senha@${timestamp}`;

  page.getSignupLoginLink().click();
  page.getSignupNameInput().type(randomName);
  page.getSignupEmailInput().type(randomEmail);
  page.getSignupButton().click();

  page.getSignupTitleMrRadio().check({ force: true });
  page.getSignupPasswordInput().type(randomPassword);
  page.getSignupDaysSelect().select("1");
  page.getSignupMonthsSelect().select("January");
  page.getSignupYearsSelect().select("2000");
  page.getSignupFirstNameInput().type(randomName);
  page.getSignupLastNameInput().type("Automacao");
  page.getSignupAddress1Input().type("Rua Exemplo, 123");
  page.getSignupCityInput().type("Sao Paulo");
  page.getSignupStateInput().type("Sao Paulo");
  page.getSignupPostalCodeInput().type("01000-000");
  page.getSignupMobileNumberInput().type("11999999999");
  page.getCreateAccountButton().click();

  cy.contains("Account Created!").should("be.visible");
  page.getSignupContinueButton().click({ force: true });
});

When("entro na aba {string}", (tabName) => {
  if (tabName.toLowerCase() === "products") {
    page.getProductsTab().click();
  } else {
    throw new Error(`A aba ${tabName} não está implementada.`);
  }
});

When("realizo uma busca randômica por produtos", () => {
  const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
  page.getSearchInput().clear().type(randomTerm);
  page.getSearchButton().click();
  cy.log(`Busca realizada com termo: ${randomTerm}`);
});

When("seleciono e adiciono 3 produtos diferentes ao carrinho", () => {
  page.getProductCards().should("have.length.at.least", 3).then((cards) => {
    Cypress._.times(3, (index) => {
      cy.wrap(cards)
        .eq(index)
        .find(".product-overlay .add-to-cart")
        .click({ force: true });

      cy.contains(/Continue Shopping|Continue shopping|Continue/, { timeout: 10000 })
        .should("be.visible")
        .click({ force: true });
    });
  });
});

Then("devo ver os 3 produtos incluídos no carrinho na tela de pagamento", () => {
  page.getViewCartButton().click({ force: true });
  cy.url({ timeout: 10000 }).should("include", "/view_cart");
  page.getCartProducts().should("have.length", 3, { timeout: 10000 });
  page.getProceedToCheckoutButton().click({ force: true });
  cy.url({ timeout: 10000 }).should("include", "/checkout");
  page.getCartProducts().should("have.length", 3, { timeout: 10000 });
});
