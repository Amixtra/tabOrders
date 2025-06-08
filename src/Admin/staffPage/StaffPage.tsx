import { useEffect, useState } from 'react';
import * as S from './StaffPage.style';
import axios from 'axios';

interface StaffMember {
  staffId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  suffix?: string;
  homeAddress: string;
  phoneNumber: string;
  pinCode: string;
}

interface StaffCategory {
  categoryId: number;
  categoryName: string;
  staffMembers: StaffMember[];
}

const getTokenData = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  } else {
    console.warn("No token found in localStorage.");
    return null;
  }
};

const StaffPage: React.FC = () => {
  // States for PIN code verification
  const [pin, setPin] = useState<string>('');
  const [pinVerified, setPinVerified] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  // Existing states for staff categories and modals
  const [staffCategories, setStaffCategories] = useState<StaffCategory[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<StaffCategory | null>(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffFirstName, setNewStaffFirstName] = useState<string>('');
  const [newStaffLastName, setNewStaffLastName] = useState<string>('');
  const [newStaffMiddleName, setNewStaffMiddleName] = useState<string>('');
  const [newStaffSuffix, setNewStaffSuffix] = useState<string>('');
  const [newStaffHomeAddress, setNewStaffHomeAddress] = useState<string>('');
  const [newStaffPhoneNumber, setNewStaffPhoneNumber] = useState<string>('');
  const [showDeleteStaffModal, setShowDeleteStaffModal] = useState(false);
  const [deleteStaffTarget, setDeleteStaffTarget] = useState<{ staff: StaffMember; category: StaffCategory } | null>(null);
  const [showStaffDetailModal, setShowStaffDetailModal] = useState(false);
  const [staffDetailTarget, setStaffDetailTarget] = useState<StaffMember | null>(null);

  const tokenData = getTokenData();
  const company = tokenData ? tokenData.companyID : '';
  const userID = tokenData ? tokenData.userId : '';

  // These useEffects are now called unconditionally
  useEffect(() => {
    if (!pinVerified || !company) return;
    fetch(`https://tab-order-server.vercel.app/api/staffCategories?company=${company}&language=en`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStaffCategories(data);
        }
      })
      .catch((err) => console.error(err));
  }, [pinVerified, company]);

  useEffect(() => {
    if (!pinVerified || !company) return;
    axios
      .get(`https://tab-order-server.vercel.app/api/staff`, { params: { userID: userID } })
      .then((res) => {
        console.log("Fetched staffs:", res.data);
      })
      .catch((err) => console.error(err));
  }, [pinVerified, company]);

  // Handler for PIN submission
  const handlePinSubmit = async () => {
    if (!pin.trim()) {
      setPinError("PIN is required");
      return;
    }
    try {
      const response = await axios.post("https://tab-order-server.vercel.app/api/check-userid", { pin });
      if (response.status === 200 && response.data.userID) {
        setPinVerified(true);
        setPinError("");
      }
    } catch (error) {
      console.error("Error checking PIN:", error);
      setPinError("Invalid PIN code, please try again.");
    }
  };

  // If PIN is not verified, show the PIN entry UI
  if (!pinVerified) {
    return (
      <S.PageWrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '15px' }}>Enter PIN Code</h2>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your PIN"
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
          />
          <div>
            <button
              onClick={handlePinSubmit}
              style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
              Submit
            </button>
          </div>
          {pinError && <p style={{ color: 'red' }}>{pinError}</p>}
        </div>
      </S.PageWrapper>
    );
  }

  // If PIN verified, render the rest of the StaffPage
  const currentCategory = staffCategories[activeTab] || null;

  const handleDeleteCategoryClick = (category: StaffCategory) => {
    setDeleteTarget(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteCategory = async () => {
    if (!deleteTarget) return;
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", { companyID: company });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/staffCategories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: userid, categoryId: deleteTarget.categoryId })
      });
      if (!response.ok) return;
      setStaffCategories((prev) => prev.filter((cat) => cat.categoryId !== deleteTarget.categoryId));
      setActiveTab(0);
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const handleCancelDeleteCategory = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const onAddCategory = () => {
    setShowAddCategoryModal(true);
  };

  const handleConfirmAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Category name cannot be empty!');
      return;
    }
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", { companyID: company });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/staffCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: userid, categoryName: newCategoryName, companyID: company })
      });
      const data = await response.json();
      if (!response.ok) return;
      const newCategory: StaffCategory = {
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        staffMembers: []
      };
      setStaffCategories((prev) => [...prev, newCategory]);
      setActiveTab(staffCategories.length);
    } catch (err) {
      console.error(err);
    } finally {
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    }
  };

  const handleCancelAddCategory = () => {
    setNewCategoryName('');
    setShowAddCategoryModal(false);
  };

  const handleAddStaff = () => {
    if (!currentCategory) return;
    setShowAddStaffModal(true);
  };

  const handleConfirmAddStaff = async () => {
    if (!newStaffFirstName.trim() || !newStaffLastName.trim() || !newStaffHomeAddress.trim()) {
      alert('Please fill in the required fields: First Name, Last Name, and Home Address.');
      return;
    }
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", { companyID: company });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryId: currentCategory.categoryId,
          firstName: newStaffFirstName,
          lastName: newStaffLastName,
          middleName: newStaffMiddleName,
          suffix: newStaffSuffix,
          homeAddress: newStaffHomeAddress,
          phoneNumber: newStaffPhoneNumber
        }),
      });
  
      if (!response.ok) return;
      const data = await response.json();
      const newStaff: StaffMember = {
        staffId: data.staffId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        suffix: data.suffix,
        homeAddress: data.homeAddress,
        phoneNumber: data.phoneNumber,
        pinCode: data.pinCode,
      };
  
      setStaffCategories((prev) =>
        prev.map((cat) => {
          if (cat.categoryId === currentCategory.categoryId) {
            return { ...cat, staffMembers: [...cat.staffMembers, newStaff] };
          }
          return cat;
        })
      );
  
    } catch (err) {
      console.error(err);
    } finally {
      setNewStaffFirstName('');
      setNewStaffLastName('');
      setNewStaffMiddleName('');
      setNewStaffSuffix('');
      setNewStaffHomeAddress('');
      setNewStaffPhoneNumber('');
      setShowAddStaffModal(false);
    }
  };

  const handleCancelAddStaff = () => {
    setNewStaffFirstName('');
    setNewStaffLastName('');
    setNewStaffMiddleName('');
    setNewStaffSuffix('');
    setNewStaffHomeAddress('');
    setNewStaffPhoneNumber('');
    setShowAddStaffModal(false);
  };

  const handleDeleteStaff = (staff: StaffMember, category: StaffCategory) => {
    setDeleteStaffTarget({ staff, category });
    setShowDeleteStaffModal(true);
  };

  const handleConfirmDeleteStaff = async () => {
    if (!deleteStaffTarget) return;
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", { companyID: company });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/staff', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryId: deleteStaffTarget.category.categoryId,
          staffId: deleteStaffTarget.staff.staffId
        }),
      });
  
      if (!response.ok) {
        alert("Failed to delete the staff member from the database.");
        return;
      }
  
      setStaffCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.categoryId === deleteStaffTarget.category.categoryId) {
            return { ...cat, staffMembers: cat.staffMembers.filter(s => s.staffId !== deleteStaffTarget.staff.staffId) };
          }
          return cat;
        })
      );
    } catch (error) {
      console.error("Error deleting staff member", error);
    } finally {
      setShowDeleteStaffModal(false);
      setDeleteStaffTarget(null);
    }
  };

  const handleViewStaffDetails = (staff: StaffMember) => {
    setStaffDetailTarget(staff);
    setShowStaffDetailModal(true);
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <S.HeaderTitle>Staff Page</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.TabRow>
          <S.ScrollableTabs isScrollable={staffCategories.length >= 3}>
            {staffCategories.map((cat, idx) => (
              <S.TabButton
                key={cat.categoryId}
                isActive={activeTab === idx}
                onClick={() => setActiveTab(idx)}
              >
                {cat.categoryName}
              </S.TabButton>
            ))}
          </S.ScrollableTabs>
          <S.AddCategoryButton onClick={onAddCategory}>
            Add Staff Category
          </S.AddCategoryButton>
        </S.TabRow>
        {currentCategory ? (
          <>
            <S.SubHeaderContainer>
              <S.SubHeader>
                {currentCategory.categoryName} <span>|</span>
                Total of {currentCategory.staffMembers.length} Staff Members
              </S.SubHeader>
              <S.DeleteCategoryButton onClick={() => { setDeleteTarget(currentCategory); setShowDeleteModal(true); }}>
                Delete Category
              </S.DeleteCategoryButton>
            </S.SubHeaderContainer>
            <S.MenuList>
              {currentCategory.staffMembers.map((staff) => (
                <S.MenuItem key={staff.staffId}>
                  <S.LeftSection>
                    <S.OptionBtn onClick={() => { setDeleteStaffTarget({ staff, category: currentCategory }); setShowDeleteStaffModal(true); }}>
                      Delete Staff
                    </S.OptionBtn>
                    <S.ItemName onClick={() => handleViewStaffDetails(staff)}>
                      {staff.firstName} {staff.lastName}
                    </S.ItemName>
                    <S.ItemName>
                      {staff.pinCode}
                    </S.ItemName>
                  </S.LeftSection>
                </S.MenuItem>
              ))}
              <S.AddMenuButton onClick={handleAddStaff}>+ Add Staff</S.AddMenuButton>
            </S.MenuList>
          </>
        ) : (
          <S.Placeholder>No categories available</S.Placeholder>
        )}
      </S.Content>

      {showDeleteModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2>Confirm Deletion</h2>
            <p>
              {deleteTarget
                ? `Are you sure you want to delete "${deleteTarget.categoryName}"?`
                : 'Are you sure you want to delete this category?'}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <S.ModalButtonCancel onClick={handleCancelDeleteCategory}>
                No
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmDeleteCategory}>
                Yes, Delete
              </S.ModalButtonConfirm>
            </div>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {showAddCategoryModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2 style={{ fontSize: '24px', fontWeight: '900' }}>Add New Category</h2>
            <p style={{ marginTop: '10px' }}>Please enter the category name:</p>
            <input
              style={{
                width: '80%',
                padding: '12px',
                fontSize: '16px',
                marginTop: '1rem'
              }}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name..."
            />
            <div style={{ marginTop: '2rem' }}>
              <S.ModalButtonCancel onClick={handleCancelAddCategory}>
                Cancel
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm style={{ marginLeft: '1rem' }} onClick={handleConfirmAddCategory}>
                Add
              </S.ModalButtonConfirm>
            </div>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {showAddStaffModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2 style={{ fontSize: '24px', fontWeight: '900' }}>Add New Staff</h2>
            <S.StyledForm>
              <S.FormRow>
                <S.FormLabel>First Name</S.FormLabel>
                <S.FormInput
                  value={newStaffFirstName}
                  onChange={(e) => setNewStaffFirstName(e.target.value)}
                  placeholder="Enter first name..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Last Name</S.FormLabel>
                <S.FormInput
                  value={newStaffLastName}
                  onChange={(e) => setNewStaffLastName(e.target.value)}
                  placeholder="Enter last name..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Middle Name</S.FormLabel>
                <S.FormInput
                  value={newStaffMiddleName}
                  onChange={(e) => setNewStaffMiddleName(e.target.value)}
                  placeholder="Enter middle name (optional)..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Suffix</S.FormLabel>
                <S.FormInput
                  value={newStaffSuffix}
                  onChange={(e) => setNewStaffSuffix(e.target.value)}
                  placeholder="Enter suffix (optional)..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Home Address</S.FormLabel>
                <S.FormInput
                  value={newStaffHomeAddress}
                  onChange={(e) => setNewStaffHomeAddress(e.target.value)}
                  placeholder="Enter home address..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Phone Number</S.FormLabel>
                <S.FormInput
                  value={newStaffPhoneNumber}
                  onChange={(e) => setNewStaffPhoneNumber(e.target.value)}
                  placeholder="Enter phone number..."
                />
              </S.FormRow>
            </S.StyledForm>
            <S.ButtonRow>
              <S.ModalButtonCancel onClick={handleCancelAddStaff}>
                Cancel
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmAddStaff}>
                Add
              </S.ModalButtonConfirm>
            </S.ButtonRow>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {showDeleteStaffModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2>Confirm Deletion</h2>
            <p>
              {deleteStaffTarget
                ? `Are you sure you want to delete "${deleteStaffTarget.staff.firstName} ${deleteStaffTarget.staff.lastName}"?`
                : 'Are you sure you want to delete this staff member?'}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <S.ModalButtonCancel onClick={() => {
                setShowDeleteStaffModal(false);
                setDeleteStaffTarget(null);
              }}>
                No
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmDeleteStaff}>
                Yes, Delete
              </S.ModalButtonConfirm>
            </div>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {showStaffDetailModal && staffDetailTarget && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2>Staff Details</h2>
            <S.StaffDetail><strong>First Name:</strong> {staffDetailTarget.firstName}</S.StaffDetail>
            <S.StaffDetail><strong>Last Name:</strong> {staffDetailTarget.lastName}</S.StaffDetail>
            {staffDetailTarget.middleName && (
              <S.StaffDetail><strong>Middle Name:</strong> {staffDetailTarget.middleName}</S.StaffDetail>
            )}
            {staffDetailTarget.suffix && (
              <S.StaffDetail><strong>Suffix:</strong> {staffDetailTarget.suffix}</S.StaffDetail>
            )}
            <S.StaffDetail><strong>Home Address:</strong> {staffDetailTarget.homeAddress}</S.StaffDetail>
            <S.StaffDetail><strong>Phone Number:</strong> {staffDetailTarget.phoneNumber}</S.StaffDetail>
            <S.StaffDetail><strong>PIN Code:</strong> {staffDetailTarget.pinCode}</S.StaffDetail>
            <div style={{ marginTop: '2rem' }}>
              <S.ModalButtonCancel onClick={() => { setShowStaffDetailModal(false); setStaffDetailTarget(null); }}>
                Close
              </S.ModalButtonCancel>
            </div>
          </S.ModalBox>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
};

export default StaffPage;
