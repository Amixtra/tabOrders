import { useEffect, useState } from 'react';
import * as S from './MenuOptions.style';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

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
  allergies?: string;
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

const MenuOptions: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newCategoryNameKR, setNewCategoryNameKR] = useState<string>('');
  const [newCategoryNameJP, setNewCategoryNameJP] = useState<string>('');
  const [newCategoryNameZH, setNewCategoryNameZH] = useState<string>('');

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
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");

  useEffect(() => {
    fetch('http://43.200.251.48:8080/api/categories?company=6afc7dfc534894d02ec6aed2f3aa2cf2&language=en')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
      const userIdResponse = await axios.post("http://43.200.251.48:8080/api/get-userID", {
        companyID: company,
      });

      const userid = userIdResponse.data.userID;
      const response = await fetch('http://43.200.251.48:8080/api/categories', {
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
      const userIdResponse = await axios.post("http://43.200.251.48:8080/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await fetch('http://43.200.251.48:8080/api/categories', {
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

    fetch('http://43.200.251.48:8080/api/items/flags', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: '6a7d23fb7bca2806',
        categoryId: updated[categoryIndex].categoryId,
        itemId: updated[categoryIndex].categoryItems[itemIndex].itemId,
        flagName: flagName,
        newValue: !oldVal
      })
    })
      .then((res) => res.json())
      .then((response) => {
      })
      .catch((e) => console.error(e));
  };

  const onMenuOption = () => {
    alert('Menu Option button clicked!');
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
      formData.append('category', category)
      formData.append('company', token.companyID)

      const res = await fetch('http://43.200.251.48:8080/api/upload', {
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

      const userIdResponse = await axios.post("http://43.200.251.48:8080/api/get-userID", {
        companyID: company,
      });

      const userid = userIdResponse.data.userID;
  
      const response = await fetch('http://43.200.251.48:8080/api/items', {
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

      console.log(response)
  
      if (!response.ok) {
        // Handle error if needed
        return;
      }
  
      const data = await response.json();
  
      // Update local state
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
  
      // Debug: see if the new item is actually there
      console.log("Updated categories with new item:", updatedCategories);
  
      // DO NOT change the category tab index to categories.length (that’s for adding categories!)
      // setActiveTab(categories.length);  // <--- Remove this.
  
      // If you’d like to remain on "Menu Options" in your parent router:
      localStorage.setItem("selectedSection", "menu-options");
  
    } catch (err) {
      console.error(err);
    } finally {
      // Reset form fields and close the modal
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
                    <S.OptionBtn onClick={onMenuOption}>Menu Option</S.OptionBtn>
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
                {selectedImageFile && (
                  <>
                    {previewUrl && (
                      <div style={{ marginTop: '5px' }}>
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '16px' }}
                        />
                      </div>
                    )}
                  </>
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
    </S.PageWrapper>
  );
};

export default MenuOptions;