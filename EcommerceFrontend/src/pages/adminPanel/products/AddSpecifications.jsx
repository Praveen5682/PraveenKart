import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addSpecification } from "../../../services/components/specification/addSpecification";
import { getSpecification } from "../../../services/components/specification/getSpecification";
import { deleteSpecification } from "../../../services/components/specification/deleteSpecification";
import { editSpecification } from "../../../services/components/specification/editSpecification";

const AddSpecifications = () => {
  const { data: specificationsData } = useQuery({
    queryFn: getSpecification,
    queryKey: ["specifications"],
  });

  const specifications = specificationsData?.data || [];

  console.log("🫱🏼‍🫲🏼", specifications);

  const [newSpecificationName, setNewSpecificationName] = useState("");

  const queryClient = useQueryClient();

  const handleAddSpecificationMutation = useMutation({
    mutationFn: addSpecification,
    onSuccess: (data) => {
      console.log("Specification added:", data);
      queryClient.invalidateQueries(["specifications"]); // ✅ Immediately refetch data
    },
    onError: (error) => {
      console.error("Error adding Specification:", error);
    },
  });

  const handleDeleteSpecificationMutation = useMutation({
    mutationFn: deleteSpecification,
    onSuccess: (data) => {
      console.log("Specification deleted:", data);
      queryClient.invalidateQueries(["specifications"]);
    },
    onError: (error) => {
      console.error("Error deleting Specification:", error);
    },
  });

  const handleEditSpecificationMutation = useMutation({
    mutationFn: editSpecification,
    onSuccess: (data) => {
      console.log("Specification edited:", data);
      queryClient.invalidateQueries(["specifications"]);
    },
    onError: (error) => {
      console.error("Error editing Specification:", error);
    },
  });

  // Handle Add Specification
  const handleAddSpecification = (e) => {
    e.preventDefault();

    handleAddSpecificationMutation.mutate({
      specificationName: newSpecificationName,
    });
    setNewSpecificationName("");
  };

  // Handle Edit
  const handleEdit = (specificationid, specificationName) => {
    const updatedName = prompt("Edit specification name:", specificationName);
    if (!updatedName || updatedName.trim() === "") return;

    handleEditSpecificationMutation.mutate({
      specificationid,
      specificationName: updatedName,
    });
  };

  // Handle Delete
  const handleDelete = (specificationid) => {
    if (
      !window.confirm("Are you sure you want to delete this specification?")
    ) {
      return;
    }

    handleDeleteSpecificationMutation.mutate(specificationid);
  };

  return (
    <div className="mx-auto mt-0 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Manage Specifications
      </h2>

      {/* Add Specification Form */}
      <form
        onSubmit={handleAddSpecification}
        className="mb-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter Specification Name"
          value={newSpecificationName}
          onChange={(e) => setNewSpecificationName(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Specifications Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Specification Name</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specifications.length > 0 ? (
              specifications.map((spec, index) => (
                <tr key={spec.id} className="hover:bg-gray-50">
                  <td className="border p-3">{spec.specificationid}</td>
                  <td className="border p-3">{spec.specificationName}</td>
                  <td className="border p-3 text-center flex justify-center gap-4">
                    <button
                      onClick={() =>
                        handleEdit(spec.specificationid, spec.specificationName)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(spec.specificationid)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="border p-3 text-center text-gray-500"
                >
                  No specifications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSpecifications;
