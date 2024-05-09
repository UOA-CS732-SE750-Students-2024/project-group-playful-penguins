/**
 * 
 *              NEEDS TO BE DONE
 * 
 * 
 * Ensures recipe page is rendered correctly
 *

// TODO NEEDS AN ID
// MOCK CALL THIS const data = await getRecipeByID(id);

it("Renders the recipe page correctly", async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={["/home/recipe/123"]}>
        <AppContextProvider value={dummyContext}>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );
  
    const servings = await findByText("Servings");
    const ingredients = await findByText("Ingredients");
    const nutritionalInfo = await findByText("Nutritional Information");
    const dog = await findByText("dog");
  
    expect(servings).toBeDefined();
    expect(ingredients).toBeDefined();
    expect(nutritionalInfo).toBeDefined();
    expect(dog).toBeDefined();
  });
*/
