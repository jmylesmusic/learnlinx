
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from "@tabler/icons-react";

const API_URL = import.meta.env.VITE_API_URL;


export function StudentsList() {

  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getAllStudents= async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_URL}/api/users/teacher/students`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const students = await response.json();
      if (response.ok) setStudents(students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const rows = students.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.profilePictureUrl} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.firstName} {item.lastName}
            </Text>
            <Text c="dimmed" fz="xs">
               Name
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.email}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.phoneNumber}</Text>
        <Text fz="xs" c="dimmed">
          Phone number
        </Text>
      </Table.Td>
    </Table.Tr>
  ));
  // const rows = data.map((item) => (
  //   <Table.Tr key={item.name}>
  //     <Table.Td>
  //       <Group gap="sm">
  //         <Avatar size={40} src={item.avatar} radius={40} />
  //         <div>
  //           <Text fz="sm" fw={500}>
  //             {item.name}
  //           </Text>
  //           <Text c="dimmed" fz="xs">
  //             {item.job}
  //           </Text>
  //         </div>
  //       </Group>
  //     </Table.Td>
  //     <Table.Td>
  //       <Text fz="sm">{item.email}</Text>
  //       <Text fz="xs" c="dimmed">
  //         Email
  //       </Text>
  //     </Table.Td>
  //     <Table.Td>
  //       <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
  //       <Text fz="xs" c="dimmed">
  //         Rate
  //       </Text>
  //     </Table.Td>
  //     <Table.Td>
  //       <Group gap={0} justify="flex-end">
  //         <ActionIcon variant="subtle" color="gray">
  //           <IconPencil
  //             style={{ width: rem(16), height: rem(16) }}
  //             stroke={1.5}
  //           />
  //         </ActionIcon>
  //         <Menu
  //           transitionProps={{ transition: "pop" }}
  //           withArrow
  //           position="bottom-end"
  //           withinPortal
  //         >
  //           <Menu.Target>
  //             <ActionIcon variant="subtle" color="gray">
  //               <IconDots
  //                 style={{ width: rem(16), height: rem(16) }}
  //                 stroke={1.5}
  //               />
  //             </ActionIcon>
  //           </Menu.Target>
  //           <Menu.Dropdown>
  //             <Menu.Item
  //               leftSection={
  //                 <IconMessages
  //                   style={{ width: rem(16), height: rem(16) }}
  //                   stroke={1.5}
  //                 />
  //               }
  //             >
  //               Send message
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={
  //                 <IconNote
  //                   style={{ width: rem(16), height: rem(16) }}
  //                   stroke={1.5}
  //                 />
  //               }
  //             >
  //               Add note
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={
  //                 <IconReportAnalytics
  //                   style={{ width: rem(16), height: rem(16) }}
  //                   stroke={1.5}
  //                 />
  //               }
  //             >
  //               Analytics
  //             </Menu.Item>
  //             <Menu.Item
  //               leftSection={
  //                 <IconTrash
  //                   style={{ width: rem(16), height: rem(16) }}
  //                   stroke={1.5}
  //                 />
  //               }
  //               color="red"
  //             >
  //               Terminate contract
  //             </Menu.Item>
  //           </Menu.Dropdown>
  //         </Menu>
  //       </Group>
  //     </Table.Td>
  //   </Table.Tr>
  // ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="md">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default StudentsList;
