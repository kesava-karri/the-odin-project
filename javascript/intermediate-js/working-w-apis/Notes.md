✅ To-do: [2/12]

- [ ] Search input
  - [✅] Giphy API gives status code 200 even for strings that it couldn’t find gif of
- [ ] .catch() to manage errors like
  - [✅] invalid API key etc.
  - [✅] Rate limit exceeded (100 requests/hr for giphy API)
- [✅] Show error message or gif based on the search input

### Scratchpad:

- Search input possibilities:
  - ✅ Empty String
  - Invalid String (Gibberish)
    - Validating this would be difficult as we need some data to check against like a dictionary ig, one way to handle this case would be checking if there's no images & status code 200 would imply it's gibberish
  - ✅ Non existent GIFs

### Issues/Mistakes:

- Issue: Was trying to get textContent of input field & it was always empty :)
- Resolved ✅: looked up mdn docs & realized I've been trying to use incorrect properpty, should've used `value` instead of `textContent` :)
