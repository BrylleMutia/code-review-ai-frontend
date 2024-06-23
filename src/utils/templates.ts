export const getPromptTemplate = (templateNum: number) => {
   switch (templateNum) {
      case 2:
         return "What are the top issues in the current package?";
      case 3:
         return "Specific parts of the code that would benefit from more comments:";
      case 4:
         return "Create functional test scenarios for the current package";
      default:
         return "";
   }
};
