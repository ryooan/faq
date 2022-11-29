---

---

# Markdown Syntax

When adding comments or suggesting questions, you can take advantage of [Markdown](http://daringfireball.net/projects/markdown/) syntax to add links, emphasis, and headers. Additionally, you can add mathematical equations via [MathJax](https://www.mathjax.org), which will convert [LaTeX syntax](https://en.wikibooks.org/wiki/LaTeX/Mathematics) into nicely typeset equations. We closely follow the [official Markdown syntax](http://daringfireball.net/projects/markdown/syntax), so that's the best place to look for a thorough explanation of how the system works. We provide a brief overview of the most common uses here.

## Inline Elements

Links can be produced using a `[link title](http://and-link-address.com)` or by surrounding a link with `<` and `>`, like `<http://www.example.com>`. There are a number of shortcuts to make your life easier if you keep repeating the same link (see the [docs](http://daringfireball.net/projects/markdown/syntax)), but these will cover 90% of the use cases.

Asterisks (\*) and underscores (\_) will both \__italicize_\_ text, and two asterisks will make the text \*\***bold**\*\*. Back-ticks denote `` `fixed-width text` ``. If you want small text, you can wrap it in a literal <small> &lt;small>html tag&lt;/small> </small>. Special characters (\`\*\_\{\}\#\+\-\.\!\`) can be escaped using a backslash, like `\*`, if they would otherwise be converted into a markdown element.

## Math

We supplement Markdown with MathJax equation processing. Mathematical formatting works by placing your equation between `\(` and `\)` (for inline equations) or `\[` and `\]` (for displayed equations). More complicated equations can be put in an `align` environment, like so

	\begin{align}
		\nabla \times \vec{\mathbf{B}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
		\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
		\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
		\nabla \cdot \vec{\mathbf{B}} & = 0
	  \end{align}

producing

$$
\begin{align*}
\nabla \times \vec{\mathbf{B}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{align*}
$$

## Headers

Headers are easiest to add using hash marks, for example

    # Primary header
      ## Secondary header
      ##### Fifth-level header

Please use headers in comments sparingly!

## Code

Big chunks of code can be indented by four spaces to make the text fixed-width and preserve whitespace, or it can be wrapped in three back-ticks. For example:

        def hello_world():
            print('hello!')

and

    ```
    def hello_world():
	    print('hello!')
    ```

have the same output.

## Quotes

If you want to quote someone, precede each line with a `>`:

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
      > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
      > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

      > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
      > id sem consectetuer libero luctus adipiscing.

which would produce:

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.

:::tip
You only need the `>` on each new line, paragraphs with text-wrapping do not need a `>` for each wrapped line.
:::

## Lists

Markdown can handle both ordered and unordered lists. For example,

    1. First item
      2. Second item

          Another paragraph in the second item.

          - Sublist item 1. Note that it's indented 4 spaces.
          - Sublist item 2.

      3. Third item.

produces:

1. First item
2. Second item

    Another paragraph in the second item.

    *   Sublist item 1. Note that it's indented 4 spaces.
    *   Sublist item 2.
3. Third item.

Unordered lists behave similarly, but use asterisks or pluses or hyphens to denote new items.

## Tables

We support simple tables of the form:

    | Header 1 | Header 2 |   ← headers
    |----------|----------|   ← mandatory header separator
    | Cell 1   | Cell 2   |   ← line 1
    | Cell 3   | Cell 4   |   ← line 2

Columns are separated by the pipe character `|`, and each line is a row. For example this:

    |Year | Predictions |  Total |
    |-----|-------------|--------|
    |2015 |         500 |    500 |
    |2016 |       25500 |  26000 |
    |2017 |       21000 |  47000 |
    |2018 |       63000 | 110000 |
    |2019 |       50000 | 160000 |
    |2020 |      220000 | 380000 |

Will render as :

<table>

<thead>

<tr>

<th>Year</th>

<th>Predictions</th>

<th>Total</th>

</tr>

</thead>

<tbody>

<tr>

<td>2015</td>

<td>500</td>

<td>500</td>

</tr>

<tr>

<td>2016</td>

<td>25500</td>

<td>26000</td>

</tr>

<tr>

<td>2017</td>

<td>21000</td>

<td>47000</td>

</tr>

<tr>

<td>2018</td>

<td>63000</td>

<td>110000</td>

</tr>

<tr>

<td>2019</td>

<td>50000</td>

<td>160000</td>

</tr>

<tr>

<td>2020</td>

<td>220000</td>

<td>380000</td>

</tr>

</tbody>

</table>

:::tip
*   White spaces before and after the pipes are ignored.
*   The initial and final pipes of each line are optional (except for one-column tables, see below).
*   The dashes in the separator line are optional.

Which means that the following markdown renders the same as above:

    Year|Predictions|Total
    ||
    2015|500|500
    2016|25500|26000
    2017|21000|47000
    2018|63000|110000
    2019|50000|160000
    2020|220000|380000

Also note that all table lines must include at least one pipe, so the initial (or final) pipe is mandatory for one-column tables:

    |U_n
    |-
    |1
    |11
    |21
    |1211
    |111221
:::

## Fine Print

Question texts support collapsible fine print sections with the syntax:

	Text before the fine print.
	[fine-print]
	Text in the fine print.
	[/fine-print]

Which would give:

<!---THIS IS BROKEN, NEED TO ADD CSS AND STYLING FROM METACULUS BUT NOT SURE HOW--->

<details>
<summary>Fine Print</summary>
Text in the fine print.
</details>

## Differences and Limitations

The official Markdown specification lets users input raw html, but we limit users to the elements described above. For example, if you try to input an image using `![Alt text](/path/to/img.jpg)` the output will look like <img alt="Alt text" src="/path/to/img.jpg"/>, and something like `<script>doSomethingEvil()</script>` certainly won't work. We also employ a few markdown extensions that handle fenced code blocks (described above) and make [lists](https://python-markdown.github.io/extensions/sane_lists/) and bolded text a little easier to manage.