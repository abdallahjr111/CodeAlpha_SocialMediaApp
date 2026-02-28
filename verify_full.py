import re
from playwright.sync_api import Playwright, sync_playwright, expect

def run_full_verification():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to register page...")
        page.goto("http://localhost:3000/register")
        page.wait_for_timeout(2000)

        print("Registering user 1...")
        page.locator("label:has-text('Username') + input").fill("jules_test")
        page.locator("label:has-text('Email') + input").fill("jules@example.com")
        page.locator("label:has-text('Password') + input").fill("password123")
        page.locator("form button:has-text('Sign Up')").click()

        print("Waiting for redirection to home...")
        expect(page).to_have_url("http://localhost:3000/", timeout=10000)

        print("Creating post...")
        page.get_by_placeholder("What's on your mind?").fill("Hello world, this is a test post!")
        page.get_by_role("button", name="Post").first.click()
        page.wait_for_timeout(2000)

        expect(page.get_by_text("Hello world, this is a test post!")).to_be_visible()

        print("Logging out user 1...")
        page.locator("button[title='Logout']").click()
        expect(page).to_have_url("http://localhost:3000/login", timeout=10000)

        print("Registering user 2...")
        page.goto("http://localhost:3000/register")
        page.locator("label:has-text('Username') + input").fill("bob_test")
        page.locator("label:has-text('Email') + input").fill("bob@example.com")
        page.locator("label:has-text('Password') + input").fill("password123")
        page.locator("form button:has-text('Sign Up')").click()

        expect(page).to_have_url("http://localhost:3000/", timeout=10000)

        print("Liking User 1's post as User 2...")
        page.wait_for_timeout(2000)
        post_card = page.locator(".post-card").first
        like_button = post_card.locator(".like-button")
        like_button.click()
        page.wait_for_timeout(1000)

        # Check if like count increased
        expect(like_button.locator("span")).to_have_text("1")

        print("Navigating to User 1's profile...")
        # Clicking the username link in the post card
        post_card.get_by_role("link", name="jules_test").first.click()
        page.wait_for_timeout(2000)
        expect(page).to_have_url(re.compile(r"/profile/jules_test"), timeout=10000)

        print("Following User 1...")
        # Be more specific with the Follow button
        follow_button = page.locator("button:has-text('Follow')")
        follow_button.click()
        page.wait_for_timeout(2000)

        expect(page.locator("button:has-text('Unfollow')")).to_be_visible()
        expect(page.get_by_text("1 Followers")).to_be_visible()

        page.screenshot(path="/home/jules/verification/final_full_check.png")
        print("Verification successful!")

        browser.close()

if __name__ == "__main__":
    run_full_verification()
