export const feedData = employeeDetail => {
  const data = [
    {
      component: "contact",
      items: [
        employeeDetail?.tel ?? "",
        employeeDetail?.email ?? "",
        employeeDetail?.linkedIn ?? "",
      ],
    } ?? [],
    {component: "skills", items: employeeDetail?.skills} ?? [],
    {component: "projects", items: employeeDetail?.projectWorked} ?? [],
    {component: "experience", items: employeeDetail?.experience} ?? [],
    {component: "aboutMe", items: employeeDetail?.description} ?? "",
    {component: "otherInterest", items: employeeDetail?.others} ?? [],
  ];
  return data;
};
