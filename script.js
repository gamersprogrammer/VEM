document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById('imageInput');
    const imageTextarea = document.getElementById('imageTextarea');
    const displayContentButton = document.getElementById('displayContentButton');
    const displayArea = document.getElementById('displayArea');

    // Function to create reply box
    function createReplyBox(contentDiv) {
        const replyBox = document.createElement('div');
        replyBox.classList.add('reply-box');
        replyBox.innerHTML = `
            <textarea placeholder="Write a reply..."></textarea>
            <button class="submit-reply">Submit</button>
        `;

        // Append reply box to display area
        contentDiv.appendChild(replyBox);

        // Focus on the textarea
        replyBox.querySelector('textarea').focus();

        // Handle reply submission
        const submitButton = replyBox.querySelector('.submit-reply');
        submitButton.addEventListener('click', function() {
            const replyContent = replyBox.querySelector('textarea').value;
            if (replyContent.trim() !== '') {
                // Do something with the reply content, e.g., display it
                console.log(replyContent);
                // Clear the textarea
                replyBox.querySelector('textarea').value = '';
                // Remove the reply box from the DOM
                contentDiv.removeChild(replyBox);
            }
        });
    }

    // Event listener for content elements
    displayArea.addEventListener('click', function(event) {
        const target = event.target;
        // Check if the clicked element is a content element
        if (target.classList.contains('content')) {
            // Call function to create reply box
            createReplyBox(target);
        }
    });

    // Function to display content
    displayContentButton.addEventListener('click', function() {
        const textcontent = imageTextarea.value;
        const files = imageInput.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function() {
                const img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    const displayContent = `
                        <div>
                            <div>
                                <img src="${reader.result}">
                            </div>
                            <p>${textcontent}</p>
                        </div>
                    `;
                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('content');
                    contentDiv.innerHTML = displayContent;
                    displayArea.appendChild(contentDiv);
                };
            };
            reader.readAsDataURL(file);
        }

        // Reset input fields after adding content
        imageInput.value = '';
        imageTextarea.value = '';
    });
});
