import { subscriptions } from "../data/subscription-data.js";

let isYearly = false;

// Toggle function
export function togglePricing(yearly) {
  isYearly = yearly;
  
  // Re-render all subscription displays
  initSubscriptionSelection(".selection-cards");
  
  // Get current user's plan and billing from data attributes or defaults
  const userCurrentPlan = window.userCurrentPlan || "PREMIUM PLAN";
  const userCurrentBilling = window.userCurrentBilling || 'monthly';
  
  initSubscriptionCards('.card-container', userCurrentPlan, userCurrentBilling);
  
  // Update sign-up page receipt if it exists
  updateSignUpReceipt();
}

function getPriceDisplay(sub) {
  if (isYearly) {
    return `<span class="price">₱${sub.yearlyPrice}</span><span class="month">/year</span>`;
  }
  return `<span class="price">₱${sub.monthlyPrice}</span><span class="month">/month</span>`;
}

function getSavingsBadge(sub) {
  if (isYearly) {
    const monthlyCost = sub.monthlyPrice * 12;
    const savings = monthlyCost - sub.yearlyPrice;
    return `<div class="savings-badge">Save ₱${savings}</div>`;
  }
  return '';
}

export function renderPricingToggle() {
  return `
    <div class="pricing-toggle">
      <span class="toggle-label ${!isYearly ? 'active' : ''}">Monthly</span>
      <label class="toggle-switch">
        <input type="checkbox" id="pricingToggle" ${isYearly ? 'checked' : ''} onchange="window.togglePricing(this.checked)">
        <span class="toggle-slider"></span>
      </label>
      <span class="toggle-label ${isYearly ? 'active' : ''}">Yearly</span>
      <span class="toggle-discount">Save 16%</span>
    </div>
  `;
}

export function renderStaticCards() {
  let html = "";
  
  subscriptions.forEach(sub => {
    html += `
      <div class="sub-card">
        <div class="sub-header">
          <h3>${sub.plan}</h3>
          <span class="badge">${sub.members || ''} ${sub.members ? 'Members' : ''}</span>
          ${getSavingsBadge(sub)}
        </div>
        
        <div class="sub-price">
          ${getPriceDisplay(sub)}
        </div>
        
        <ul class="sub-benefits">
          ${sub.benefits.map(b => `<li>✓ ${b}</li>`).join("")}
        </ul>
      </div>
    `;
  });
  
  return html;
}

export function renderSubscriptionCards(currentPlan = null, currentBilling = 'monthly') {
  let subscriptionHTML = `
    <div class="pricing-wrapper">
      ${renderPricingToggle()}
      <div class="sub-container">
  `;


  subscriptions.forEach((subscription) => {
    const isCurrentPlan = currentPlan === subscription.plan;
    const isCurrentBilling = (isYearly && currentBilling === 'yearly') || (!isYearly && currentBilling === 'monthly');
    
    // Determine button behavior
    let buttonClass, buttonText, buttonLink;
    
    if (isCurrentPlan && isCurrentBilling) {
      // Same plan and same billing cycle
      buttonClass = "current-plan";
      buttonText = "Current Plan";
      buttonLink = "";
    } else if (isCurrentPlan && !isCurrentBilling) {
      // Same plan but different billing cycle
      buttonClass = "change-plan";
      buttonText = isYearly ? "Upgrade to Yearly" : "Switch to Monthly";
      const currentPrice = isYearly ? subscription.yearlyPrice : subscription.monthlyPrice;
      const planParam = encodeURIComponent(subscription.plan);
      const billingParam = isYearly ? 'yearly' : 'monthly';
      buttonLink = `href="payment.html?type=billing-change&plan=${planParam}&price=${currentPrice}&billing=${billingParam}"`;
    } else {
      // Different plan
      const currentPrice = isYearly ? subscription.yearlyPrice : subscription.monthlyPrice;
      const isUpgrade = currentPrice > getCurrentPlanPrice(currentPlan, currentBilling);
      buttonClass = "change-plan";
      buttonText = isUpgrade ? "Upgrade Plan" : "Downgrade Plan";
      const planParam = encodeURIComponent(subscription.plan);
      const billingParam = isYearly ? 'yearly' : 'monthly';
      buttonLink = `href="payment.html?type=change&plan=${planParam}&price=${currentPrice}&billing=${billingParam}"`;
    }

    subscriptionHTML += `
      <div class="sub-card">
        <div class="sub-header">
          <h3>${subscription.plan}</h3>
          ${getSavingsBadge(subscription)}
        </div>
        <div class="sub-price">
          ${getPriceDisplay(subscription)}
        </div>
        <ul class="sub-benefits">
          ${subscription.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
        </ul>
        <div class="buttons">
          <a ${buttonLink} class="${buttonClass}">${buttonText}</a>
        </div>
      </div>
    `;
  });

  subscriptionHTML += '</div>';
  return subscriptionHTML;
}

export function renderSelectionCards() {
 let html = `
    <div class="pricing-wrapper">
      ${renderPricingToggle()}
      <div class="sub-container">
  `;

  
  subscriptions.forEach(sub => {
    const id = sub.plan.toLowerCase().replace(/\s+/g, "-");
    const currentPrice = isYearly ? sub.yearlyPrice : sub.monthlyPrice;
    
    html += `
      <label class="sub-card-select">
        <input type="radio" name="membership-plan" id="${id}" value="${sub.plan}" data-price="${currentPrice}" data-billing="${isYearly ? 'yearly' : 'monthly'}">
        
        <div class="sub-header">
          <h3>${sub.plan}</h3>
          ${getSavingsBadge(sub)}
        </div>
        
        <div class="sub-price">
          ${getPriceDisplay(sub)}
        </div>
        
        <ul class="sub-benefits">
          ${sub.benefits.map(b => `<li>✓ ${b}</li>`).join("")}
        </ul>
      </label>
    `;
  });
  
  html += '</div>';
  return html;
}

export function initSubscriptionCards(containerSelector, currentPlan = null, currentBilling = 'monthly') {
  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = renderSubscriptionCards(currentPlan, currentBilling);
  }
}

export function initSubscriptionSelection(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = renderSelectionCards();
  }
}

function getCurrentPlanPrice(planName, billing = 'monthly') {
  const plan = subscriptions.find((sub) => sub.plan === planName);
  if (!plan) return 0;
  
  // If checking current plan price, use the billing parameter
  if (billing === 'yearly') {
    return plan.yearlyPrice;
  }
  return plan.monthlyPrice;
}

function updateSignUpReceipt() {
  const receiptRow = document.querySelector('.reciept-row');
  const totalPrice = document.querySelector('.total-price');
  
  if (receiptRow && totalPrice) {
    const selectedInput = document.querySelector('input[name="membership-plan"]:checked');
    if (selectedInput) {
      const planName = selectedInput.value;
      const plan = subscriptions.find(sub => sub.plan === planName);
      if (plan) {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        const period = isYearly ? 'yearly' : 'monthly';
        receiptRow.querySelector('.price').textContent = `₱${price}`;
        receiptRow.querySelector('small').textContent = `Billed ${period}`;
        totalPrice.textContent = `₱${price}`;
      }
    }
  }
}

// Make functions available globally
window.togglePricing = togglePricing;
window.getSelectedPlanPrice = function() {
  const selectedInput = document.querySelector('input[name="membership-plan"]:checked');
  if (selectedInput) {
    return {
      price: selectedInput.dataset.price,
      billing: selectedInput.dataset.billing
    };
  }
  return null;
};

// Initialize
initSubscriptionSelection(".selection-cards");

// Set user's current plan and billing (can be set from server/session data)
window.userCurrentPlan = "PREMIUM PLAN";
window.userCurrentBilling = 'monthly'; // Change this to 'yearly' if user is on yearly plan

initSubscriptionCards('.card-container', window.userCurrentPlan, window.userCurrentBilling);