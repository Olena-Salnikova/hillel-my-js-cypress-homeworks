describe('Footer elements', () => {
    const expectedFooterSocialLinks = [
        "facebook.com",
        "t.me",
        "youtube.com",
        "instagram.com",
        "linkedin.com"
    ]

    const expectedFooterContactUsLinks = [
        "ithillel.ua",
        "support@ithillel.ua"
    ]

    beforeEach(() => {
        cy.visit('/');
    });

// Test case to verify the presence of social links in the footer    
    it('Should find the Social Links', () => {
        cy.get("div.socials a.socials_link").each(($link) => {
            const href = $link.prop('href');
            const domain = new URL(href).hostname.replace('www.', '');
            expect(expectedFooterSocialLinks).to.include(domain);
        })
    });

// Test case to verify the presence of Contact Us links in the footer
    it('Should find the Contact Us links', () => {
        cy.get("div.flex-column a.contacts_link").each(($link) => {
            const href = $link.prop('href');
            expect(expectedFooterContactUsLinks).to.include($link.text());
        })
    });
});