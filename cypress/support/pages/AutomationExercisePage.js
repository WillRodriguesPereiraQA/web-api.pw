export class AutomationExercisePage {
  constructor() {
    this.siteUrl = 'https://www.automationexercise.com/';

    // Navegação
    this.homeLink = 'a[href="/"]';
    this.productsTab = 'a:contains("Products")';

    // Cadastro/Autenticação
    this.signupLoginLink = 'a:contains("Signup / Login")';
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.signupTitleMrRadio = '#id_gender1';
    this.signupPasswordInput = '#password';
    this.signupDaysSelect = '#days';
    this.signupMonthsSelect = '#months';
    this.signupYearsSelect = '#years';
    this.signupFirstNameInput = '#first_name';
    this.signupLastNameInput = '#last_name';
    this.signupAddress1Input = '#address1';
    this.signupCityInput = '#city';
    this.signupStateInput = '#state';
    this.signupPostalCodeInput = '#zipcode';
    this.signupMobileNumberInput = '#mobile_number';
    this.createAccountButton = 'button[data-qa="create-account"]';
    this.signupContinueButton = 'a[data-qa="continue-button"]';

    // Busca e produtos
    this.searchInput = '#search_product';
    this.searchButton = '#submit_search';
    this.productList = '.features_items .product-image-wrapper';
    this.productAddToCartButton = '.product-overlay .add-to-cart';

    // Carrinho e checkout
    this.viewCartButton = 'a[href="/view_cart"]';
    this.checkoutButton = 'a[href="/checkout"]';
    this.cartTable = '.cart_info';
    this.cartProducts = '.cart_description';
    this.proceedToCheckoutButton = '.check_out';
    this.continueShoppingButton = '.btn.btn-success.close-modal';
  }

  visitHome() {
    cy.visit(this.siteUrl);
  }

  getSignupLoginLink() {
    return cy.contains("a", "Signup / Login");
  }

  getSignupNameInput() {
    return cy.get(this.signupNameInput);
  }

  getSignupEmailInput() {
    return cy.get(this.signupEmailInput);
  }

  getSignupButton() {
    return cy.get(this.signupButton);
  }

  getSignupTitleMrRadio() {
    return cy.get(this.signupTitleMrRadio);
  }

  getSignupPasswordInput() {
    return cy.get(this.signupPasswordInput);
  }

  getSignupDaysSelect() {
    return cy.get(this.signupDaysSelect);
  }

  getSignupMonthsSelect() {
    return cy.get(this.signupMonthsSelect);
  }

  getSignupYearsSelect() {
    return cy.get(this.signupYearsSelect);
  }

  getSignupFirstNameInput() {
    return cy.get(this.signupFirstNameInput);
  }

  getSignupLastNameInput() {
    return cy.get(this.signupLastNameInput);
  }

  getSignupAddress1Input() {
    return cy.get(this.signupAddress1Input);
  }

  getSignupCityInput() {
    return cy.get(this.signupCityInput);
  }

  getSignupStateInput() {
    return cy.get(this.signupStateInput);
  }

  getSignupPostalCodeInput() {
    return cy.get(this.signupPostalCodeInput);
  }

  getSignupMobileNumberInput() {
    return cy.get(this.signupMobileNumberInput);
  }

  getCreateAccountButton() {
    return cy.get(this.createAccountButton);
  }

  getSignupContinueButton() {
    return cy.get(this.signupContinueButton);
  }

  getProductsTab() {
    return cy.contains("a", "Products");
  }

  getSearchInput() {
    return cy.get(this.searchInput);
  }

  getSearchButton() {
    return cy.get(this.searchButton);
  }

  getProductCards() {
    return cy.get(this.productList);
  }

  getProductAddToCartButton() {
    return cy.get(this.productAddToCartButton);
  }

  getViewCartButton() {
    return cy.contains("a", "Cart");
  }

  getCartProducts() {
    return cy.get(this.cartProducts);
  }

  getProceedToCheckoutButton() {
    return cy.contains("a", "Proceed To Checkout");
  }

  getContinueShoppingButton() {
    return cy.get(this.continueShoppingButton);
  }
}
