document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    let isResizing = false;

    sidebar.addEventListener('mousedown', function(e) {
        if (e.offsetX > sidebar.clientWidth - 10) { // Check if clicking near the right edge
            isResizing = true;
            document.body.style.cursor = 'ew-resize';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
            if (newWidth > 50 && newWidth < 500) { // Set min and max width
                sidebar.style.width = `${newWidth}px`;
                sidebar.classList.remove('collapsed');
            } else if (newWidth <= 50) { // Collapse sidebar into a line
                sidebar.style.width = `5px`;
                sidebar.classList.add('collapsed');
            }
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
        document.body.style.cursor = 'default';
    });
});
