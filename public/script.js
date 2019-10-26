$.ajax({
    url: '/api/blog-posts',
    dataType: "json",
    success: function (responseJSON) {
        for (let i = 0; i < responseJSON.post.length; i++) {
            if (responseJSON.status >= 300) {
                $('#blogList').empty()
                $('#blogList').append(`<div>Error, ${responseJSON.message}, status: ${responseJSON.status} </div>`)
            }
            $('#blogList').append(`<ul>
                                        <li>
                                        id: ${responseJSON.post[i].id}
                                        </li>
                                        <li>
                                        title: ${responseJSON.post[i].title}
                                        </li>
                                        <li>
                                        content: ${responseJSON.post[i].content}
                                        </li>
                                        <li>
                                        author: ${responseJSON.post[i].author}
                                        </li>
                                        <li>
                                        publishDate: ${responseJSON.post[i].publishDate}
                                        </li>
                                        </ul>`)
        }
        $("ul").css("list-style", "none")
        $("ul").css("border", "solid", "black")
        $("ul").css("padding", "10px")
    },
    error: function (err) {
        console.log(err)
    }
});
