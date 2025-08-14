let bookClubData = null;

// Load data from JSON file
async function loadBookClubData() {
    try {
        const response = await fetch('data.json');
        bookClubData = await response.json();
        createMemberCards();
        createLeaderboard();
    } catch (error) {
        console.error('Error loading book club data:', error);
    }
}

function createMemberCards() {
    if (!bookClubData) return;

    const memberCardSection = document.getElementById('member-cards');
    memberCardSection.innerHTML = '';

    for (let memberName in bookClubData.members) {
        const member = bookClubData.members[memberName];

        console.log(member);

        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.classList.add(member.active ? 'active' : 'inactive');

        // Avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'member-avatar';
        avatarDiv.textContent = member.avatar;
        memberCard.appendChild(avatarDiv);

        // Info container
        const infoDiv = document.createElement('div');
        infoDiv.className = 'member-info';

        // Name and badges
        const nameHeading = document.createElement('h4');
        nameHeading.textContent = memberName + ' ';

        member.booksRead.forEach(bookKey => {
            const book = bookClubData.books[bookKey];

            // Badge container
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge';
            badgeSpan.textContent = book.emoji;

            // Tooltip
            const tooltipSpan = document.createElement('span');
            tooltipSpan.className = 'badge-tooltip';
            tooltipSpan.textContent = `${book.title} - ${book.dateRead}`;

            // Nest tooltip inside badge
            badgeSpan.appendChild(tooltipSpan);

            // Append badge to heading
            nameHeading.appendChild(badgeSpan);
        });

        // Role/description
        const rolePara = document.createElement('p');
        rolePara.textContent = member.role;

        // Put together info block
        infoDiv.appendChild(nameHeading);
        infoDiv.appendChild(rolePara);
        memberCard.appendChild(infoDiv);

        // Append to the page (assuming you have a section called memberCardSection)
        memberCardSection.appendChild(memberCard);
    }

}

function createLeaderboard() {
    if (!bookClubData) return;

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    const memberEntries = Object.entries(bookClubData.members);

    // Sort by books read, descending
    memberEntries.sort((a, b) => b[1].booksRead.length - a[1].booksRead.length);

    // Take only the top 3
    const topThree = memberEntries.slice(0, 3);

    topThree.forEach(([name, data], index) => {
        const listItem = document.createElement('li');
        listItem.className = 'leaderboard-entry card';

        if (index === 0) {
            listItem.classList.add('first-place');
        }

        listItem.innerHTML = `
            <div class="leaderboard-card">
                <div class="leaderboard-left-info">
                    <span class="name">${name}</span>
                </div>
                <div class="leaderboard-right-info">
                    <span class="avatar">${data.avatar}</span>
                    <span class="count">${data.booksRead.length} books</span>
                </div>
            </div>
        `;

        leaderboardList.appendChild(listItem);
    });
}


// Load data when page loads
document.addEventListener('DOMContentLoaded', loadBookClubData);

(function () {
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer;

    function resetClicks() {
        clickCount = 0;
        clearTimeout(clickTimer);
    }

    function emojiShower() {
        const emojis = ['🦍', '🐒', '🙈', '🙉', '🙊', '🍌', '📚', '🧠'];
        const showerDuration = 10000; // 10 seconds
        const intervalTime = 100;

        const interval = setInterval(() => {
            const emoji = document.createElement('div');
            emoji.className = 'ape-emoji';

            // Pick a random emoji from the list
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.animationDuration = 3 + Math.random() * 2 + 's';

            document.body.appendChild(emoji);

            // Remove the emoji after it finishes falling
            setTimeout(() => emoji.remove(), 5000);
        }, intervalTime);

        setTimeout(() => clearInterval(interval), showerDuration);
    }

    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            clickTimer = setTimeout(resetClicks, 2000); // Start 2 second window
        }

        if (clickCount === 7) {
            resetClicks();
            emojiShower();
        }
    });
})();

