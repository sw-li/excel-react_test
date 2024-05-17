/* global Excel*/

const handleNouvelleLigne = async (setNotification) => {
  try {
    await Excel.run(async (context) => {
      const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
      const tables = currentWorksheet.tables.load("items");
      await context.sync();

      if (tables.items.length > 0) {
        const firstTable = tables.items[0];
        const columns = firstTable.columns.load("items");
        const column = firstTable.columns.getItem("N° d'ordre");
        column.load("values");
        await context.sync();

        // Get the number of columns in the table
        const columnCount = columns.items.length;

        let orderValues = column.values.slice(1).flat();
        let currentOrder = Math.max(...orderValues);

        // Create a new row with the first cell set to the new order value and others set to null
        const newRow = Array(columnCount).fill(null);
        newRow[0] = currentOrder + 1;

        // Add a new row to the table
        firstTable.rows.add(null, [newRow]);
        await context.sync();

        setNotification("New row added to the first table.", false);
      } else {
        setNotification("No tables found on the current sheet.", true);
      }
    });
  } catch (error) {
    setNotification(`Error: ${error.message}`, true);
  }
};

export default handleNouvelleLigne;
