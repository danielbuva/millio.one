const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const returnUser = (req, res) => {
  return res.json(req.user);
};

function flatSortTransform(arrays) {
  const flattened = arrays.flat();

  const sorted = flattened.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const transformed = sorted.map((item) => {
    const { Descriptions, Origins } = item;
    const descriptionsArray = Descriptions
      ? Descriptions.map((description) => description.value)
      : undefined;
    const originsArray = Origins
      ? Origins.map((origin) => origin.value)
      : undefined;

    return {
      ...item.toJSON(),
      description: descriptionsArray,
      origin: originsArray,
    };
  });

  const finalArray = transformed.reduce((result, item) => {
    const createdAt = new Date(item.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    const existingEntry = result.find((entry) => entry.date === createdAt);

    if (existingEntry) {
      existingEntry.entries.push(item);
    } else {
      result.push({ date: createdAt, entries: [item] });
    }

    return result;
  }, []);

  const sortedFinalArray = finalArray.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return sortedFinalArray;
}

module.exports = {
  returnUser,
  flatSortTransform,
  today,
};
