import { useEffect, useState } from 'react';
import * as S from './MenuOptions.style';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';

const milkImg = '/assets/icon/icon_milk.png';
const eggsImg = '/assets/icon/icon_eggs.png';
const treeNutsImg = '/assets/icon/icon_tree_nuts.png';
const peanutsImg = '/assets/icon/icon_peanuts.png';
const shellfishImg = '/assets/icon/icon_shellfish.png';
const fishImg = '/assets/icon/icon_fish.png';
const soybeansImg = '/assets/icon/icon_soybeans.png';
const glutenImg = '/assets/icon/icon_cereals_containing_gluten.png';

interface CategoryItem {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemSoldOutFlag?: boolean;
  itemNewFlag?: boolean;
  itemHotFlag?: boolean;
  itemPauseFlag?: boolean;
  itemImageUrl?: string;
  itemDescription?: string;
  allergies?: string[];
}

interface Category {
  categoryId: number;
  categoryName: string;
  categoryItems: CategoryItem[];
}

interface Allergy {
  name: string;
  image: string;
}

const ALLERGIES: Allergy[] = [
  { name: 'Milk', image: milkImg },
  { name: 'Eggs', image: eggsImg },
  { name: 'Tree Nuts', image: treeNutsImg },
  { name: 'Peanuts', image: peanutsImg },
  { name: 'Shellfish', image: shellfishImg },
  { name: 'Fish', image: fishImg },
  { name: 'Soybeans', image: soybeansImg },
  { name: 'Cereals Containing Gluten', image: glutenImg },
];

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

const MenuOptions: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Category deletion modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // Category addition modal states
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newCategoryNameKR, setNewCategoryNameKR] = useState<string>('');
  const [newCategoryNameJP, setNewCategoryNameJP] = useState<string>('');
  const [newCategoryNameZH, setNewCategoryNameZH] = useState<string>('');

  // Menu item addition modal states
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemNameKR, setNewItemNameKR] = useState<string>('');
  const [newItemNameJP, setNewItemNameJP] = useState<string>('');
  const [newItemNameZH, setNewItemNameZH] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  // Menu item deletion modal states
  const [showDeleteMenuModal, setShowDeleteMenuModal] = useState(false);
  const [deleteMenuTarget, setDeleteMenuTarget] = useState<{item: CategoryItem, category: Category} | null>(null);

  // Get companyID from the JWT token
  const tokenData = getTokenData();
  const company = tokenData ? tokenData.companyID : '';

  useEffect(() => {
    if (!company) return;
    fetch(`https://tab-order-server.vercel.app/api/categories?company=${company}&language=en`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.error(err));
  }, [company]);

  const currentCategory = categories[activeTab] || null;

  useEffect(() => {
    if (selectedImageFile) {
      const objectUrl = URL.createObjectURL(selectedImageFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl('');
    }
  }, [selectedImageFile]);

  const toggleAllergy = (allergyName: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyName)
        ? prev.filter((name) => name !== allergyName)
        : [...prev, allergyName]
    );
  };

  const handleDeleteCategoryClick = (category: Category) => {
    setDeleteTarget(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryId: deleteTarget.categoryId
        })
      });
      if (!response.ok) {
        return;
      }
      setCategories((prev) =>
        prev.filter((cat) => cat.categoryId !== deleteTarget.categoryId)
      );
      setActiveTab(0);
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const handleCancelDelete = () => {
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
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await fetch('https://tab-order-server.vercel.app/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryNameEN: newCategoryName,
          categoryNameKR: newCategoryNameKR,
          categoryNameJP: newCategoryNameJP,
          categoryNameZH: newCategoryNameZH
        })
      });
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      const newCategory: Category = {
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        categoryItems: data.categoryItems || []
      };
      setCategories((prev) => [...prev, newCategory]);
      setActiveTab(categories.length);
    } catch (err) {
      console.error(err);
    } finally {
      setNewCategoryName('');
      setNewCategoryNameKR('');
      setNewCategoryNameJP('');
      setNewCategoryNameZH('');
      setShowAddCategoryModal(false);
    }
  };

  const handleCancelAddCategory = () => {
    setNewCategoryName('');
    setNewCategoryNameKR('');
    setNewCategoryNameJP('');
    setNewCategoryNameZH('');
    setShowAddCategoryModal(false);
  };

  const handleToggleFlag = (
    categoryIndex: number,
    itemIndex: number,
    flagName: 'itemSoldOutFlag' | 'itemPauseFlag' | 'itemNewFlag' | 'itemHotFlag'
  ) => {
    const updated = [...categories];
    const oldVal = !!updated[categoryIndex].categoryItems[itemIndex][flagName];
    updated[categoryIndex].categoryItems[itemIndex][flagName] = !oldVal;
    setCategories(updated);

    fetch('https://tab-order-server.vercel.app/api/items/flags', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: '6a7d23fb7bca2806', // Replace with company-specific userID if needed
        categoryId: updated[categoryIndex].categoryId,
        itemId: updated[categoryIndex].categoryItems[itemIndex].itemId,
        flagName: flagName,
        newValue: !oldVal
      })
    })
      .then((res) => res.json())
      .then((response) => {
        // Handle response if needed
      })
      .catch((e) => console.error(e));
  };

  const uploadImageToS3 = async (file: File, category: string): Promise<string | null> => {
    try {
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

      const token = getTokenData();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('company', token.companyID);

      const res = await fetch('https://tab-order-server.vercel.app/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      return data.objectUrl;
    } catch (err) {
      console.error('Error uploading file', err);
      return '';
    }
  };

  const handleAddMenu = () => {
    if (!currentCategory) return;
    setShowAddMenuModal(true);
  };

  const handleConfirmAddMenu = async () => {
    if (!newItemName.trim()) {
      alert('Item name cannot be empty!');
      return;
    }
    if (!currentCategory) return;
  
    try {
      const allItemIds = categories.flatMap(cat => cat.categoryItems.map(item => item.itemId));
      const newItemId = allItemIds.length > 0 ? Math.max(...allItemIds) + 1 : 1;
  
      let finalImageUrl = '';
      const categoryName = currentCategory.categoryName || 'defaultCategory';
      if (selectedImageFile) {
        const uploadedUrl = await uploadImageToS3(selectedImageFile, categoryName);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
  
      const response = await fetch('https://tab-order-server.vercel.app/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryId: currentCategory.categoryId,
          itemId: newItemId,
          itemNameEN: newItemName,
          itemNameKR: newItemNameKR,
          itemNameJP: newItemNameJP,
          itemNameZH: newItemNameZH,
          itemPrice: newItemPrice,
          itemDescription: newItemDescription,
          itemImageUrl: finalImageUrl,
          allergies: selectedAllergies,
        }),
      });

      if (!response.ok) {
        return;
      }
  
      const data = await response.json();
  
      // Update local state with the new menu item
      const updatedCategories = [...categories];
      const idx = updatedCategories.findIndex(
        (cat) => cat.categoryId === currentCategory.categoryId
      );
      if (idx !== -1) {
        updatedCategories[idx].categoryItems.push({
          itemId: newItemId,
          itemName: data.itemName,
          itemPrice: data.itemPrice || 0,
          itemImageUrl: data.itemImageUrl,
          itemDescription: data.itemDescription,
          allergies: data.allergies,
        });
      }
  
      setCategories(updatedCategories);
  
    } catch (err) {
      console.error(err);
    } finally {
      setNewItemName('');
      setNewItemNameKR('');
      setNewItemNameJP('');
      setNewItemNameZH('');
      setNewItemPrice(0);
      setNewItemDescription('');
      setSelectedImageFile(null);
      setSelectedAllergies([]);
      setPreviewUrl('');
      setShowAddMenuModal(false);
    }
  };  

  const handleCancelAddMenu = () => {
    setNewItemName('');
    setNewItemNameKR('');
    setNewItemNameJP('');
    setNewItemNameZH('');
    setNewItemPrice(0);
    setNewItemDescription('');
    setSelectedImageFile(null);
    setSelectedAllergies([]);
    setPreviewUrl('');
    setShowAddMenuModal(false);
  };

  const translateText = async (text: string, targetLang: string) => {
    if (!text.trim()) return '';
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      const data = await response.json();
      if (data.responseData?.translatedText) {
        return data.responseData.translatedText;
      } else {
        return '';
      }
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  // Handler for confirming menu item deletion from the modal
  const handleConfirmDeleteMenu = async () => {
    if (!deleteMenuTarget) return;
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
  
      const response = await fetch('https://tab-order-server.vercel.app/api/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userid,
          categoryId: deleteMenuTarget.category.categoryId,
          itemId: deleteMenuTarget.item.itemId
        }),
      });
  
      if (!response.ok) {
        alert("Failed to delete the item from the database.");
        return;
      }
  
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.categoryId === deleteMenuTarget.category.categoryId) {
            return { ...cat, categoryItems: cat.categoryItems.filter(menuItem => menuItem.itemId !== deleteMenuTarget.item.itemId) };
          }
          return cat;
        })
      );
    } catch (error) {
      console.error("Error deleting menu item", error);
    } finally {
      setShowDeleteMenuModal(false);
      setDeleteMenuTarget(null);
    }
  };

  // Instead of directly calling the delete function, open the menu deletion modal.
  const handleDeleteMenu = (item: CategoryItem, category: Category) => {
    setDeleteMenuTarget({ item, category });
    setShowDeleteMenuModal(true);
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <S.HeaderTitle>Menu Manager</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.TabRow>
          <S.ScrollableTabs isScrollable={categories.length >= 3}>
            {categories.map((cat, idx) => (
              <S.TabButton
                key={cat.categoryId}
                isActive={activeTab === idx}
                onClick={() => setActiveTab(idx)}
              >
                {cat.categoryName}
              </S.TabButton>
            ))}
          </S.ScrollableTabs>
          <S.AddCategoryButton onClick={onAddCategory}>Add Category</S.AddCategoryButton>
        </S.TabRow>
        {currentCategory ? (
          <>
            <S.SubHeaderContainer>
              <S.SubHeader>
                {currentCategory.categoryName} <span>|</span>
                Total of {currentCategory.categoryItems.length} Items
              </S.SubHeader>
              <S.DeleteCategoryButton onClick={() => handleDeleteCategoryClick(currentCategory)}>
                Delete Category
              </S.DeleteCategoryButton>
            </S.SubHeaderContainer>
            <S.MenuList>
              {currentCategory.categoryItems.map((item, i) => (
                <S.MenuItem key={item.itemId}>
                  <S.LeftSection>
                    <S.OptionBtn onClick={() => handleDeleteMenu(item, currentCategory)}>
                      Delete Menu
                    </S.OptionBtn>
                    <S.ItemName>{item.itemName}</S.ItemName>
                  </S.LeftSection>
                  <S.RightSection>
                    <S.ToggleButton
                      red={!!item.itemSoldOutFlag}
                      onClick={() => handleToggleFlag(activeTab, i, 'itemSoldOutFlag')}
                    >
                      Sold Out
                    </S.ToggleButton>
                    <S.ToggleButton
                      active={!!item.itemPauseFlag}
                      onClick={() => handleToggleFlag(activeTab, i, 'itemPauseFlag')}
                    >
                      Hide Menu
                    </S.ToggleButton>
                    <S.ToggleButton
                      active={!!item.itemNewFlag}
                      onClick={() => handleToggleFlag(activeTab, i, 'itemNewFlag')}
                    >
                      New Menu
                    </S.ToggleButton>
                    <S.ToggleButton
                      active={!!item.itemHotFlag}
                      onClick={() => handleToggleFlag(activeTab, i, 'itemHotFlag')}
                    >
                      Popular Menu
                    </S.ToggleButton>
                  </S.RightSection>
                </S.MenuItem>
              ))}
              <S.AddMenuButton onClick={handleAddMenu}>+ Add Menu</S.AddMenuButton>
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
              <S.ModalButtonCancel onClick={handleCancelDelete}>No</S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmDelete}>Yes, Delete</S.ModalButtonConfirm>
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
            <div style={{ width: '80%', position: 'relative', marginTop: '1rem', marginLeft: '2.7rem' }}>
              <input
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                value={newCategoryNameKR}
                onChange={(e) => setNewCategoryNameKR(e.target.value)}
                placeholder="In Korean..."
              />
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
                onClick={async () => {
                  const translatedText = await translateText(newCategoryName, 'ko');
                  setNewCategoryNameKR(translatedText || '');
                }}
              >
                Auto
              </button>
            </div>
            <div style={{ width: '80%', position: 'relative', marginTop: '1rem', marginLeft: '2.7rem' }}>
              <input
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                value={newCategoryNameJP}
                onChange={(e) => setNewCategoryNameJP(e.target.value)}
                placeholder="In Japanese..."
              />
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
                onClick={async () => {
                  const translatedText = await translateText(newCategoryName, 'ja');
                  setNewCategoryNameJP(translatedText || '');
                }}
              >
                Auto
              </button>
            </div>
            <div style={{ width: '80%', position: 'relative', marginTop: '1rem', marginLeft: '2.7rem' }}>
              <input
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                value={newCategoryNameZH}
                onChange={(e) => setNewCategoryNameZH(e.target.value)}
                placeholder="In Chinese..."
              />
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
                onClick={async () => {
                  const translatedText = await translateText(newCategoryName, 'zh-CN');
                  setNewCategoryNameZH(translatedText || '');
                }}
              >
                Auto
              </button>
            </div>
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

      {showAddMenuModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2 style={{ fontSize: '24px', fontWeight: '900' }}>Add New Menu</h2>
            <S.StyledForm>
              <S.FormRow>
                <S.FormLabel>Menu Item Name</S.FormLabel>
                <S.FormInput
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name in English..."
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Item Name (Korean)</S.FormLabel>
                <S.FormInput
                  value={newItemNameKR}
                  onChange={(e) => setNewItemNameKR(e.target.value)}
                  placeholder="In Korean..."
                />
                <S.AutoButton
                  onClick={async () => {
                    const translatedText = await translateText(newItemName, 'ko');
                    setNewItemNameKR(translatedText || '');
                  }}
                >
                  Auto
                </S.AutoButton>
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Item Name (Japanese)</S.FormLabel>
                <S.FormInput
                  value={newItemNameJP}
                  onChange={(e) => setNewItemNameJP(e.target.value)}
                  placeholder="In Japanese..."
                />
                <S.AutoButton
                  onClick={async () => {
                    const translatedText = await translateText(newItemName, 'ja');
                    setNewItemNameJP(translatedText || '');
                  }}
                >
                  Auto
                </S.AutoButton>
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Item Name (Chinese)</S.FormLabel>
                <S.FormInput
                  value={newItemNameZH}
                  onChange={(e) => setNewItemNameZH(e.target.value)}
                  placeholder="In Chinese..."
                />
                <S.AutoButton
                  onClick={async () => {
                    const translatedText = await translateText(newItemName, 'zh-CN');
                    setNewItemNameZH(translatedText || '');
                  }}
                >
                  Auto
                </S.AutoButton>
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Price</S.FormLabel>
                <NumericFormat 
                  value={newItemPrice === 0 ? '' : newItemPrice}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    setNewItemPrice(floatValue || 0);
                  }}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  allowLeadingZeros={false}
                  prefix="₱ "
                  placeholder="₱ 0.00"
                  customInput={S.FormInput}
                />
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Menu Image (optional)</S.FormLabel>
                <S.FormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedImageFile(e.target.files[0]);
                    }
                  }}
                />
                {selectedImageFile && previewUrl && (
                  <div style={{ marginTop: '5px' }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '16px' }}
                    />
                  </div>
                )}
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Allergies (Select included foods on your menu.)</S.FormLabel>
                <S.AllergyContainer>
                  {ALLERGIES.map((allergy) => (
                    <S.AllergyItem key={allergy.name}>
                      <S.AllergyCheckbox
                        type="checkbox"
                        id={`allergy-${allergy.name}`}
                        checked={selectedAllergies.includes(allergy.name)}
                        onChange={() => toggleAllergy(allergy.name)}
                      />
                      <S.AllergyLabel htmlFor={`allergy-${allergy.name}`}>
                        <S.AllergyImage src={allergy.image} alt={allergy.name} />
                        <span>{allergy.name}</span>
                      </S.AllergyLabel>
                    </S.AllergyItem>
                  ))}
                </S.AllergyContainer>
              </S.FormRow>
              <S.FormRow>
                <S.FormLabel>Menu Description</S.FormLabel>
                <S.FormTextArea
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Enter item Description..."
                  rows={5}
                />
              </S.FormRow>
            </S.StyledForm>
            <S.ButtonRow>
              <S.ModalButtonCancel onClick={handleCancelAddMenu}>
                Cancel
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmAddMenu}>
                Add
              </S.ModalButtonConfirm>
            </S.ButtonRow>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

      {showDeleteMenuModal && (
        <S.ModalOverlay>
          <S.ModalBox>
            <h2>Confirm Deletion</h2>
            <p>
              {deleteMenuTarget
                ? `Are you sure you want to delete "${deleteMenuTarget.item.itemName}"?`
                : 'Are you sure you want to delete this menu item?'}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <S.ModalButtonCancel onClick={() => {
                setShowDeleteMenuModal(false);
                setDeleteMenuTarget(null);
              }}>
                No
              </S.ModalButtonCancel>
              <S.ModalButtonConfirm onClick={handleConfirmDeleteMenu}>
                Yes, Delete
              </S.ModalButtonConfirm>
            </div>
          </S.ModalBox>
        </S.ModalOverlay>
      )}
    </S.PageWrapper>
  );
};

export default MenuOptions;
